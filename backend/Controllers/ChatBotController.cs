using KONSUME.Core.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Chat;

namespace DaticianProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserInteractionService _userInteractionService;
        private readonly IProfileService _profileService;
        private readonly IMealRecommendationService _mealRecommendationService;
        // Ensure that there are no duplicate definitions
        public ChatBotController(IConfiguration configuration, IUserInteractionService userInteractionService, IProfileService profileService, IMealRecommendationService mealRecommendationService)
        {
            _configuration = configuration;
            _userInteractionService = userInteractionService;
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





        

    }


}