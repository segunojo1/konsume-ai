using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Xunit;
using DaticianProj.Controllers;
using OpenAI_API;
using OpenAI_API.Chat;
using System.Collections.Generic;

/*namespace DaticianProj.Tests
{
    public class BlogControllerTests
    {
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly Mock<OpenAIAPI> _mockOpenAIAPI;
        private readonly BlogController _controller;

        public BlogControllerTests()
        {
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(config => config["OpenAI:APIKey"]).Returns("fake-api-key");

            // Mock the OpenAIAPI methods
            _mockOpenAIAPI = new Mock<OpenAIAPI>("fake-api-key");
            _mockOpenAIAPI.Setup(api => api.Chat.CreateChatCompletionAsync(It.IsAny<ChatRequest>()))
                .ReturnsAsync(new ChatResult
                {
                    Choices = new List<ChatChoice>
                    {
                        new ChatChoice
                        {
                            Message = new ChatMessage(ChatMessageRole.Assistant, "Generated content for testing.")
                        }
                    }
                });

            // Initialize the controller with mocked dependencies
            _controller = new BlogController(_mockConfiguration.Object)
            {
                _openAIAPI = _mockOpenAIAPI.Object
            };
        }

        [Fact]
        public async Task GenerateBlogForAllGoals_ReturnsOkResult_WithContent()
        {
            // Act
            var result = await _controller.();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var content = Assert.IsType<dynamic>(okResult.Value);
            Assert.NotNull(content.content);
            Assert.Contains("gain weight", content.content); // Ensure that content includes a section for each goal
        }

        [Fact]
        public async Task GenerateBlog_ValidGoal_ReturnsOkResult_WithContent()
        {
            // Arrange
            var healthGoal = "gain weight";

            // Act
            var result = await _controller.GenerateBlog(healthGoal);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var content = Assert.IsType<dynamic>(okResult.Value);
            Assert.NotNull(content.content);
            Assert.Contains("Generated content for testing.", content.content);
        }

        [Fact]
        public async Task GenerateBlog_InvalidGoal_ReturnsBadRequest()
        {
            // Arrange
            var healthGoal = "invalid goal";

            // Act
            var result = await _controller.GenerateBlog(healthGoal);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Invalid health goal specified.", badRequestResult.Value);
        }
    }
}
*/