﻿using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Application.Services;
using KONSUME.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OpenAI_API;
using OpenAI_API.Chat;
using System.Linq;
using System.Threading.Tasks;

namespace DaticianProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserInteractionService _userInteractionService;
        private readonly IUserService _userService;
        private readonly IProfileService _profileService;
        private readonly IMealRecommendationService _mealRecommendationService;
        // Ensure that there are no duplicate definitions
        public ChatBotController(IConfiguration configuration, IUserInteractionService userInteractionService, IUserService userService, IProfileService profileService, IMealRecommendationService mealRecommendationService)
        {
            _configuration = configuration;
            _userInteractionService = userInteractionService;
            _userService = userService;
            _profileService = profileService;
            _mealRecommendationService = mealRecommendationService;
        }

        [HttpPost("ChatBot")]
        public async Task<IActionResult> GetAIResponse(int profileId, string request)
        {
            string apiKey = _configuration["OpenAI:APIKey"];

            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "API Key is missing.");
            }

            var profileResponse = await _profileService.GetProfile(profileId);
            if (profileResponse == null || !profileResponse.IsSuccessful)
            {
                return BadRequest("User profile not found.");
            }

            var profile = profileResponse.Value;

            string profileInfo = $"Age: {(profile.DateOfBirth != null ? CalculateAge(profile.DateOfBirth) : "Not provided")}, " +
                     $"Nationality: {profile.Nationality ?? "Not provided"}, " +
                     $"Diet Type: {profile.DietType ?? "Not provided"}, " +
                     $"Allergies: {(profile.Allergies?.Any() == true ? string.Join(", ", profile.Allergies) : "None")}, " +
                     $"Goals: {(profile.UserGoals?.Any() == true ? string.Join(", ", profile.UserGoals) : "None")}, " +
                     $"Weight: {profile.Weight}, Height: {profile.Height}.";



            try
            {
                var openai = new OpenAIAPI(apiKey);
                var chatRequest = new ChatRequest
                {
                    Model = "ft:gpt-4o-mini-2024-07-18:personal:foodieai:A5z1pehk",
                    Messages = new[]
                    {
                        new ChatMessage(ChatMessageRole.System, "FoodieAI is a food and health chatbot."),
                        new ChatMessage(ChatMessageRole.User, $"User Profile: {profileInfo}. Request: {request}")
                    }
                };

                var result = await openai.Chat.CreateChatCompletionAsync(chatRequest);
                string aiResponse = result.Choices.Count > 0 ? result.Choices[0].Message.Content + " #FoodieAI🥙🍴👨‍⚕️" : "No response from AI.";

                await _userInteractionService.SaveUserInteractionAsync(profile.UserId, request, aiResponse);
                return Ok(aiResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }

        [HttpGet("PreviousInteractions")]
        public async Task<IActionResult> GetPreviousInteractions(int id)
        {
            try
            {
                var interactions = await _userInteractionService.GetUserInteractionsAsync(id);
                if (interactions == null || !interactions.Any())
                {
                    return Ok(null);
                }
                return Ok(interactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }





        [HttpGet("GenerateMeals")]
        public async Task<IActionResult> GenerateMeals(int profileId)
        {
            string apiKey = _configuration["OpenAI:APIKey"];

            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "API Key is missing.");
            }

            var profileResponse = await _profileService.GetProfile(profileId);
            if (profileResponse == null || !profileResponse.IsSuccessful)
            {
                return BadRequest("User profile not found.");
            }

            var profile = profileResponse.Value;

            // Generate a daily unique seed or identifier based on the current date
            string dateSeed = DateTime.UtcNow.ToString("yyyyMMdd");

            var existingMeals = await _mealRecommendationService.GetDailyRecommendationsAsync(profileId, dateSeed);

            if (!string.IsNullOrEmpty(existingMeals))
            {
                // Deserialize the JSON string to a list
                var mealList = JsonConvert.DeserializeObject<List<Meal>>(existingMeals);

            // If the deserialized list contains items, return them as the response
                if (mealList != null && mealList.Count > 0)
                {
                    return Ok(mealList);
                }
            }

            // Construct the prompt for the AI
            var prompt = $"I want to {profile.UserGoals} and I have {profile.Allergies} generate 15 {profile.Nationality} meals for breakfast, lunch, dinner, or snacks suitable for me";
            
            try
            {
                var openai = new OpenAIAPI(apiKey);
                var chatRequest = new ChatRequest
                {
                    Model = "ft:gpt-3.5-turbo-0613:personal:foodieai:A0W1EPi5", // Correct model name
                    Messages = new[]
                    {
                        new ChatMessage(ChatMessageRole.System, "FoodieAI is a food chatbot."),
                        new ChatMessage(ChatMessageRole.User, prompt)
                    }
                };

                var result = await openai.Chat.CreateChatCompletionAsync(chatRequest);
                string aiResponse = result.Choices.Count > 0 ? result.Choices[0].Message.Content : "No response from AI.";

                // Print the raw AI response for debugging purposes
                Console.WriteLine("Raw AI Response: ");
                Console.WriteLine(aiResponse);

                var cleanedResponse = aiResponse
                                    .Replace("System.Collections.Generic.List`1[System.String]", "")
                                    .Trim();

                // Split the meals by '$' to get individual meal entries
                string[] meals = cleanedResponse.Split('$', StringSplitOptions.RemoveEmptyEntries);

                // Create a list to hold structured meal objects
                var mealList = new List<object>();

                // Iterate through the meals and split each meal into components
                foreach (var meal in meals)
                {
                    // Split each meal into its name, course type, and explanation
                    var mealParts = meal.Split('=', StringSplitOptions.RemoveEmptyEntries);

                    if (mealParts.Length == 3)
                    {
                        mealList.Add(new
                        {
                            Name = mealParts[0].Trim(),
                            Course = mealParts[1].Trim(),
                            Description = mealParts[2].Trim()
                        });
                    }
                }

                // Serialize the meal list to a JSON string for storage
                string mealJson = JsonConvert.SerializeObject(mealList);

                // Save the generated meal recommendations to the database
                await _mealRecommendationService.SaveDailyRecommendationsAsync(profileId, dateSeed, mealJson);

                // Return the structured meal list as a response
                return Ok(mealList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }

    public class Meal
    {
        public string Name { get; set; }
        public string Course { get; set; }
        public string Description { get; set; }
    }

}