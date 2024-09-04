using Moq;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using DaticianProj.Controllers;
using OpenAI_API;
using OpenAI_API.Chat;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models.ProfileModel;
using KONSUME.Models;

public class ChatBotControllerTests
    {
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly Mock<IUserInteractionService> _mockUserInteractionService;
        private readonly Mock<IUserService> _mockUserService;
        private readonly Mock<IProfileService> _mockProfileService;
        private readonly Mock<IMealRecommendationService> _mockMealRecommendationService;
        private readonly ChatBotController _controller;

        public ChatBotControllerTests()
        {
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(config => config["OpenAI:APIKey"]).Returns("fake-api-key");

            _mockUserInteractionService = new Mock<IUserInteractionService>();
            _mockUserService = new Mock<IUserService>();
            _mockProfileService = new Mock<IProfileService>();
            _mockMealRecommendationService = new Mock<IMealRecommendationService>();

            _controller = new ChatBotController(
                _mockConfiguration.Object,
                _mockUserInteractionService.Object,
                _mockUserService.Object,
                _mockProfileService.Object,
                _mockMealRecommendationService.Object
            );
        }

        [Fact]
        public async Task GetAIResponse_ValidRequest_ReturnsOkResult_WithAIResponse()
        {
            // Arrange
            var profileId = 1;
            var request = "What are some healthy snacks?";
            var profile = new ProfileResponse
            {
                DateOfBirth = new DateTime(1990, 1, 1),
                Nationality = "Nigerian",
                DietType = "vegan",
                Allergies = new List<string> { "peanuts" },
                UserGoals = new List<string> { "lose weight" },
                Weight = 70,
                Height = 170,
                UserId = 1
            };

            _mockProfileService.Setup(p => p.GetProfile(profileId))
                .ReturnsAsync(new BaseResponse<ProfileResponse> {IsSuccessful   = true,  Value = profile });

            var chatResponse = new ChatResult
            {
                Choices = new List<ChatChoice>
                {
                    new ChatChoice
                    {
                        Message = new ChatMessage(ChatMessageRole.Assistant, "Here are some healthy snacks: fruit, nuts, yogurt.")
                    }
                }
            };

            var mockOpenAIAPI = new Mock<OpenAIAPI>("fake-api-key");
            mockOpenAIAPI.Setup(api => api.Chat.CreateChatCompletionAsync(It.IsAny<ChatRequest>()))
                .ReturnsAsync(chatResponse);

            // Inject the mock OpenAIAPI into the controller if possible or replace with a method that uses the mock
            // _controller.SetOpenAIAPI(mockOpenAIAPI.Object);

            // Act
            var result = await _controller.GetAIResponse(profileId, request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var content = Assert.IsType<string>(okResult.Value);
            Assert.Contains("Here are some healthy snacks", content);
        }

        [Fact]
        public async Task GetAIResponse_ProfileNotFound_ReturnsBadRequest()
        {
            // Arrange
            var profileId = 1;
            var request = "What are some healthy snacks?";

            _mockProfileService.Setup(p => p.GetProfile(profileId))
                .ReturnsAsync(new BaseResponse<ProfileResponse> { IsSuccessful = false });

            // Act
            var result = await _controller.GetAIResponse(profileId, request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("User profile not found.", badRequestResult.Value);
        }

        [Fact]
        public async Task GenerateMeals_ValidProfile_ReturnsOkResult_WithMeals()
        {
            // Arrange
            var profileId = 1;
            var profile = new ProfileResponse
            {
                DateOfBirth = new DateTime(1990, 1, 1),
                Nationality = "Nigerian",
                DietType = "vegan",
                Allergies = new List<string> { "peanuts" },
                UserGoals = new List<string> { "gain weight" },
                Weight = 70,
                Height = 170
            };

            _mockProfileService.Setup(p => p.GetProfile(profileId))
                .ReturnsAsync(new BaseResponse<ProfileResponse> { IsSuccessful = true, Value =  profile });

            var chatResponse = new ChatResult
            {
                Choices = new List<ChatChoice>
                {
                    new ChatChoice
                    {
                        Message = new ChatMessage(ChatMessageRole.Assistant, "Meal1=Breakfast=Healthy oats.$Meal2=Lunch=Quinoa salad.")
                    }
                }
            };

            var mockOpenAIAPI = new Mock<OpenAIAPI>("fake-api-key");
            mockOpenAIAPI.Setup(api => api.Chat.CreateChatCompletionAsync(It.IsAny<ChatRequest>()))
                .ReturnsAsync(chatResponse);

            // Inject the mock OpenAIAPI into the controller if possible or replace with a method that uses the mock
            // _controller.SetOpenAIAPI(mockOpenAIAPI.Object);

            // Act
            var result = await _controller.GenerateMeals(profileId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var mealList = Assert.IsType<List<object>>(okResult.Value);
            Assert.NotEmpty(mealList);
        }

        [Fact]
        public async Task GenerateMeals_ProfileNotFound_ReturnsBadRequest()
        {
            // Arrange
            var profileId = 1;

            _mockProfileService.Setup(p => p.GetProfile(profileId))
                .ReturnsAsync(new BaseResponse<ProfileResponse> { IsSuccessful = false });

            // Act
            var result = await _controller.GenerateMeals(profileId);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("User profile not found.", badRequestResult.Value);
        }
    }
