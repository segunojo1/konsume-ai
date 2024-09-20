using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using Moq;
using Xunit;

public class StreakServiceTests
{
    private readonly Mock<IStreakRepository> _streakRepositoryMock;
    private readonly Mock<IProfileRepository> _profileRepositoryMock;
    private readonly StreakService _streakService;

    public StreakServiceTests()
    {
        _streakRepositoryMock = new Mock<IStreakRepository>();
        _profileRepositoryMock = new Mock<IProfileRepository>();
        _streakService = new StreakService(_streakRepositoryMock.Object, _profileRepositoryMock.Object);
    }

    [Fact]
    public async Task GetStreakCountByProfileIdAsync_ExistingProfile_ReturnsStreakCount()
    {
        // Arrange
        var profileId = 1;
        var streak = new Streak { StreakCount = 5 };
        _streakRepositoryMock.Setup(repo => repo.GetStreakByProfileIdAsync(profileId))
                             .ReturnsAsync(streak);

        // Act
        var result = await _streakService.GetStreakCountByProfileIdAsync(profileId);

        // Assert
        Assert.Equal(5, result);
    }

    [Fact]
    public async Task UpdateReadingStreakAsync_ProfileNotFound_ReturnsFailure()
    {
        // Arrange
        var profileId = 1;
        _profileRepositoryMock.Setup(repo => repo.GetAsync(profileId))
                              .ReturnsAsync((Profile)null); // Profile not found

        // Act
        var result = await _streakService.UpdateReadingStreakAsync(profileId);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Profile not found.", result.Message);
    }

    [Fact]
    public async Task UpdateReadingStreakAsync_NewStreak_CreatesStreak()
    {
        // Arrange
        var profileId = 1;
        var profile = new Profile { Id = profileId };
        _profileRepositoryMock.Setup(repo => repo.GetAsync(profileId)).ReturnsAsync(profile);
        _streakRepositoryMock.Setup(repo => repo.GetStreakByProfileIdAsync(profileId))
                             .ReturnsAsync((Streak)null); // No existing streak

        // Act
        var result = await _streakService.UpdateReadingStreakAsync(profileId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal(1, result.StreakCount);
        Assert.Equal("New streak created.", result.Message);
    }

    [Fact]
    public async Task UpdateReadingStreakAsync_ExistingStreak_UpdatesCount()
    {
        // Arrange
        var profileId = 1;
        var profile = new Profile { Id = profileId };
        var existingStreak = new Streak
        {
            ProfileId = profileId,
            StreakCount = 2,
            DateModified = DateTime.UtcNow.AddDays(-1) // Last read was yesterday
        };

        _profileRepositoryMock.Setup(repo => repo.GetAsync(profileId)).ReturnsAsync(profile);
        _streakRepositoryMock.Setup(repo => repo.GetStreakByProfileIdAsync(profileId))
                             .ReturnsAsync(existingStreak);

        // Act
        var result = await _streakService.UpdateReadingStreakAsync(profileId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal(3, result.StreakCount); // Count should be incremented
    }

    [Fact]
    public async Task UpdateReadingStreakAsync_AlreadyUpdatedToday_ReturnsMessage()
    {
        // Arrange
        var profileId = 1;
        var profile = new Profile { Id = profileId };
        var existingStreak = new Streak
        {
            ProfileId = profileId,
            StreakCount = 2,
            DateModified = DateTime.UtcNow // Last read was today
        };

        _profileRepositoryMock.Setup(repo => repo.GetAsync(profileId)).ReturnsAsync(profile);
        _streakRepositoryMock.Setup(repo => repo.GetStreakByProfileIdAsync(profileId))
                             .ReturnsAsync(existingStreak);

        // Act
        var result = await _streakService.UpdateReadingStreakAsync(profileId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Reading streak already updated for today.", result.Message);
    }
}
