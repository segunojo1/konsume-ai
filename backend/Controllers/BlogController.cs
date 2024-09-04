using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Chat;
using OpenAI_API;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DaticianProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly OpenAIAPI _openAIAPI;

        private static readonly (string Title, string Goal)[] HealthGoals = new[]
        {
            ("Effective Strategies for Healthy Weight Gain", "gain weight"),
            ("Effective Strategies for Healthy Weight Loss", "lose weight"),
            ("Maintaining a Healthy Weight", "maintain weight"),
            ("Starting a Fitness Journey and Setting Achievable Goals", "start a fitness journey"),
            ("Enhancing Athletic Performance Through Diet and Exercise", "enhance athletic performance"),
            ("Improving Muscle Tone Through Diet and Exercise", "improve muscle tone"),
            ("Boosting Energy Levels Through Nutrition and Lifestyle Changes", "boost energy level"),
            ("Managing Stress Through Diet, Exercise, and Mindfulness", "manage stress"),
            ("Improving Cardiovascular Strength Through Diet and Exercise", "improve cardiovascular strength"),
            ("Benefits of Healthy Eating and Tips for Maintaining a Balanced Diet", "eat healthy")
        };

        private static DateTime _lastUpdate = DateTime.MinValue;
        private static object _updateLock = new object();
        private static object[] _cachedBlogs;

        public BlogController(IConfiguration configuration)
        {
            _configuration = configuration;
            string apiKey = _configuration["OpenAI:APIKey"];
            _openAIAPI = new OpenAIAPI(apiKey);
        }

        // Generate blog content for all predefined goals
        [HttpGet("GenerateAllBlogs")]
        public async Task<IActionResult> GenerateAllBlogs()
        {
            if (DateTime.UtcNow - _lastUpdate < TimeSpan.FromHours(24))
            {
                // Return cached blogs if updated within the last 24 hours
                return Ok(new { content = _cachedBlogs });
            }

            // Generate new content and update the cache
            var blogResponses = await GenerateContentForAllGoals();
            lock (_updateLock)
            {
                _cachedBlogs = blogResponses;
                _lastUpdate = DateTime.UtcNow;
            }
            return Ok(new { content = blogResponses });
        }

        // Generate a prompt for the specified health goal or any valid health-related query
        private string GeneratePromptForHealthGoal(string healthGoal)
        {
            return healthGoal.ToLower() switch
            {
                "gain weight" => "Write an informative blog post about effective strategies and tips for healthy weight gain.",
                "lose weight" => "Write an informative blog post about effective strategies and tips for healthy weight loss.",
                "maintain weight" => "Write an informative blog post about maintaining a healthy weight.",
                "start a fitness journey" => "Write an informative blog post about starting a fitness journey and setting achievable goals.",
                "enhance athletic performance" => "Write an informative blog post about enhancing athletic performance through diet and exercise.",
                "improve muscle tone" => "Write an informative blog post about improving muscle tone through diet and exercise.",
                "boost energy level" => "Write an informative blog post about boosting energy levels through nutrition and lifestyle changes.",
                "manage stress" => "Write an informative blog post about managing stress through diet, exercise, and mindfulness.",
                "improve cardiovascular strength" => "Write an informative blog post about improving cardiovascular strength through diet and exercise.",
                "eat healthy" => "Write an informative blog post about the benefits of healthy eating and tips for maintaining a balanced diet.",
                _ => $"Write an informative blog post about {healthGoal}, with a focus on its impact on nutrition, fitness, or overall body health."
            };
        }

        // Generate title for the specified health goal
        private string GeneratePromptForHealthGoalTitle(string healthGoal)
        {
            var match = HealthGoals.FirstOrDefault(goal => goal.Goal.Equals(healthGoal.ToLower(), StringComparison.OrdinalIgnoreCase));
            return match.Title ?? "Default Title"; // Default title if no match is found
        }

        // Generate blog content for a specific goal and return a string
        private async Task<string> GenerateBlogContentForGoal(string healthGoal)
        {
            string prompt = GeneratePromptForHealthGoal(healthGoal);

            var chatRequest = new ChatRequest
            {
                Model = "gpt-3.5-turbo",
                Messages = new[] { new ChatMessage(ChatMessageRole.User, prompt) }
            };

            try
            {
                var result = await _openAIAPI.Chat.CreateChatCompletionAsync(chatRequest);
                var aiResponses = result.Choices.Select(choice => choice.Message.Content).ToArray();
                var responseText = string.Join("\n\n", aiResponses);

                // Return the response text
                return responseText;
            }
            catch (Exception ex)
            {
                // Log or handle the error
                Console.WriteLine($"An error occurred while generating content: {ex.Message}");
                return "An error occurred while generating content.";
            }
        }

        [HttpGet("GenerateBlog")]
        public async Task<IActionResult> GenerateBlog([FromQuery] string healthGoal)
        {
            if (string.IsNullOrEmpty(healthGoal))
            {
                return BadRequest(new string[] { "Health goal cannot be empty." });
            }

            // Generate the blog content for the specified health goal
            var blogResponse = await GenerateBlogContentForGoal(healthGoal);

            // Capitalize the first letter of each word in the healthGoal for the title
            var title = CapitalizeWords(healthGoal);

            // Return the response with title
            return Ok(new
            {
                Id = 1, // Or handle dynamic IDs
                Title = title,
                Text = blogResponse
            });
        }

        // Helper method to capitalize the first letter of each word
        private string CapitalizeWords(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            // Split the string into words
            var words = input.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                // Capitalize the first letter of each word
                if (words[i].Length > 0)
                {
                    words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
                }
            }

            // Join the words back into a single string
            return string.Join(" ", words);
        }

        // Generate blog content for all predefined health goals
        private async Task<object[]> GenerateContentForAllGoals()
        {
            var tasks = HealthGoals.Select(async (item, index) =>
            {
                var content = await GenerateBlogContentForGoal(item.Goal);
                return new
                {
                    Id = index + 1,
                    Title = item.Title,
                    Text = content
                };
            });

            var results = await Task.WhenAll(tasks);
            return results;
        }
    }
}













/*using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Chat;
using OpenAI_API;
using System.Linq;
using System.Threading.Tasks;

namespace DaticianProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly OpenAIAPI _openAIAPI;

        private static readonly (string Title, string Goal)[] HealthGoals = new[]
        {
            ("Effective Strategies for Healthy Weight Gain", "gain weight"),
            ("Effective Strategies for Healthy Weight Loss", "lose weight"),
            ("Maintaining a Healthy Weight", "maintain weight"),
            ("Starting a Fitness Journey and Setting Achievable Goals", "start a fitness journey"),
            ("Enhancing Athletic Performance Through Diet and Exercise", "enhance athletic performance"),
            ("Improving Muscle Tone Through Diet and Exercise", "improve muscle tone"),
            ("Boosting Energy Levels Through Nutrition and Lifestyle Changes", "boost energy level"),
            ("Managing Stress Through Diet, Exercise, and Mindfulness", "manage stress"),
            ("Improving Cardiovascular Strength Through Diet and Exercise", "improve cardiovascular strength"),
            ("Benefits of Healthy Eating and Tips for Maintaining a Balanced Diet", "eat healthy")
        };

        public BlogController(IConfiguration configuration)
        {
            _configuration = configuration;
            string apiKey = _configuration["OpenAI:APIKey"];
            _openAIAPI = new OpenAIAPI(apiKey);
        }

        // Generate blog content for all predefined goals
        [HttpGet("GenerateAllBlogs")]
        public async Task<IActionResult> GenerateAllBlogs()
        {
            var blogResponses = await GenerateContentForAllGoals();
            return Ok(new { content = blogResponses });
        }

        // Generate a prompt for the specified health goal or any valid health-related query
        private string GeneratePromptForHealthGoal(string healthGoal)
        {
            return healthGoal.ToLower() switch
            {
                "gain weight" => "Write an informative blog post about effective strategies and tips for healthy weight gain.",
                "lose weight" => "Write an informative blog post about effective strategies and tips for healthy weight loss.",
                "maintain weight" => "Write an informative blog post about maintaining a healthy weight.",
                "start a fitness journey" => "Write an informative blog post about starting a fitness journey and setting achievable goals.",
                "enhance athletic performance" => "Write an informative blog post about enhancing athletic performance through diet and exercise.",
                "improve muscle tone" => "Write an informative blog post about improving muscle tone through diet and exercise.",
                "boost energy level" => "Write an informative blog post about boosting energy levels through nutrition and lifestyle changes.",
                "manage stress" => "Write an informative blog post about managing stress through diet, exercise, and mindfulness.",
                "improve cardiovascular strength" => "Write an informative blog post about improving cardiovascular strength through diet and exercise.",
                "eat healthy" => "Write an informative blog post about the benefits of healthy eating and tips for maintaining a balanced diet.",
                _ => $"Write an informative blog post about {healthGoal}, with a focus on its impact on nutrition, fitness, or overall body health."
            };
        }

        // Generate title for the specified health goal
        private string GeneratePromptForHealthGoalTitle(string healthGoal)
        {
            var match = HealthGoals.FirstOrDefault(goal => goal.Goal.Equals(healthGoal.ToLower(), StringComparison.OrdinalIgnoreCase));
            return match.Title ?? "Default Title"; // Default title if no match is found
        }

        // Generate blog content for a specific goal and return a string
        private async Task<string> GenerateBlogContentForGoal(string healthGoal)
        {
            string prompt = GeneratePromptForHealthGoal(healthGoal);

            var chatRequest = new ChatRequest
            {
                Model = "gpt-3.5-turbo",
                Messages = new[] { new ChatMessage(ChatMessageRole.User, prompt) }
            };

            try
            {
                var result = await _openAIAPI.Chat.CreateChatCompletionAsync(chatRequest);
                var aiResponses = result.Choices.Select(choice => choice.Message.Content).ToArray();
                var responseText = string.Join("\n\n", aiResponses);

                // Return the response text
                return responseText;
            }
            catch (Exception ex)
            {
                // Log or handle the error
                Console.WriteLine($"An error occurred while generating content: {ex.Message}");
                return "An error occurred while generating content.";
            }
        }

        [HttpGet("GenerateBlog")]
        public async Task<IActionResult> GenerateBlog([FromQuery] string healthGoal)
        {
            if (string.IsNullOrEmpty(healthGoal))
            {
                return BadRequest(new string[] { "Health goal cannot be empty." });
            }

            // Generate the blog content for the specified health goal
            var blogResponse = await GenerateBlogContentForGoal(healthGoal);

            // Capitalize the first letter of each word in the healthGoal for the title
            var title = CapitalizeWords(healthGoal);

            // Return the response with title
            return Ok(new
            {
                Id = 1, // Or handle dynamic IDs
                Title = title,
                Text = blogResponse
            });
        }

        // Helper method to capitalize the first letter of each word
        private string CapitalizeWords(string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            // Split the string into words
            var words = input.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                // Capitalize the first letter of each word
                if (words[i].Length > 0)
                {
                    words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
                }
            }

            // Join the words back into a single string
            return string.Join(" ", words);
        }

        // Generate blog content for all predefined health goals
        private async Task<object[]> GenerateContentForAllGoals()
        {
            var tasks = HealthGoals.Select(async (item, index) =>
            {
                var content = await GenerateBlogContentForGoal(item.Goal);
                return new
                {
                    Id = index + 1,
                    Title = item.Title,
                    Text = content
                };
            });

            var results = await Task.WhenAll(tasks);
            return results;
        }
    }
}*/
