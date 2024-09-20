using KONSUME.Core.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenAI_API;
using OpenAI_API.Chat;

namespace DaticianProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealRecommendation : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IProfileService _profileService;
        private readonly IMealRecommendationService _mealRecommendationService;
        // Ensure that there are no duplicate definitions
        public MealRecommendation(IConfiguration configuration, IProfileService profileService, IMealRecommendationService mealRecommendationService)
        {
            _configuration = configuration;
            _profileService = profileService;
            _mealRecommendationService = mealRecommendationService;
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
                if (mealList != null && mealList.Count > 8)
                {
                    return Ok(mealList);
                }
            }

            // Construct the prompt for the AI
            var prompt = $"I want to {profile.UserGoals} and i have {profile.Allergies} issues generate 15 {profile.Nationality} meals for breakfast, lunch, dinner or snacks suitable for me";
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

                var cleanedResponse1 = aiResponse
                                    .Replace("issues", "")
                                    .Trim();

                var cleanedResponse = cleanedResponse1
                                    .Replace("System.Collections.Generic.List`1[System.String]", "")
                                    .Trim();
                // Split the meals by '$' to get individual meal entries
                string[] meals = cleanedResponse.Split('$', StringSplitOptions.RemoveEmptyEntries);

                // Create a list to hold structured meal objects
                var mealList = new List<object>();
                
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

                if (mealList.Count > 8)
                {
                    string mealJson = JsonConvert.SerializeObject(mealList);

                    // Save the generated meal recommendations to the database
                    await _mealRecommendationService.SaveDailyRecommendationsAsync(profileId, dateSeed, mealJson);
                    return Ok(mealList);
                }
                else
                {
                    return await GenerateMeals(profileId);
                }
                
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }



        public class Meal
        {
            public string Name { get; set; }
            public string Course { get; set; }
            public string Description { get; set; }
        }
    }
}
