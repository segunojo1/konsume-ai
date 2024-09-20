using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class UserInteractionServiceTests
{
    private readonly UserInteractionService _userInteractionService;
    private readonly DbContextOptions<KonsumeContext> _dbContextOptions;

    public UserInteractionServiceTests()
    {
        // Setup in-memory database
        _dbContextOptions = new DbContextOptionsBuilder<KonsumeContext>()
            .UseNpgsql("KonsumeTestDb")
            .Options;

        var context = new KonsumeContext(_dbContextOptions);
        _userInteractionService = new UserInteractionService(context);
    }

    [Fact]
    public async Task SaveUserInteractionAsync_SavesInteraction()
    {
        // Arrange
        int userId = 1;
        string question = "What is the menu today?";
        string response = "Today's menu includes pasta and salad.";

        // Act
        var interaction = await _userInteractionService.SaveUserInteractionAsync(userId, question, response);

        // Assert
        using (var context = new KonsumeContext(_dbContextOptions))
        {
            var savedInteraction = await context.UserInteractions.FindAsync(interaction.Id);
            Assert.NotNull(savedInteraction);
            Assert.Equal(userId, savedInteraction.UserId);
            Assert.Equal(question, savedInteraction.Question);
            Assert.Equal(response, savedInteraction.Response);
            Assert.False(savedInteraction.IsDeleted);
        }
    }

    [Fact]
    public async Task GetUserInteractionsAsync_ReturnsInteractions()
    {
        // Arrange
        int userId = 1;
        var interactions = new List<UserInteraction>
        {
            new UserInteraction { UserId = userId, Question = "Question 1", Response = "Response 1", DateCreated = DateTime.UtcNow.AddMinutes(-1) },
            new UserInteraction { UserId = userId, Question = "Question 2", Response = "Response 2", DateCreated = DateTime.UtcNow }
        };

        using (var context = new KonsumeContext(_dbContextOptions))
        {
            context.UserInteractions.AddRange(interactions);
            await context.SaveChangesAsync();
        }

        // Act
        var result = await _userInteractionService.GetUserInteractionsAsync(userId);

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Response 2", result[0].Response); // Most recent interaction should be first
        Assert.Equal("Response 1", result[1].Response);
    }
}

