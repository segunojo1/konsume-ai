using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models.ProfileModel;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using Moq;
using Xunit;

public class ProfileServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IRoleRepository> _roleRepositoryMock;
    private readonly Mock<IProfileRepository> _profileRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IHttpContextAccessor> _httpContextAccessorMock;
    private readonly Mock<IVerificationCodeRepository> _verificationCodeRepositoryMock;
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly ProfileService _profileService;

    public ProfileServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _roleRepositoryMock = new Mock<IRoleRepository>();
        _profileRepositoryMock = new Mock<IProfileRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        _verificationCodeRepositoryMock = new Mock<IVerificationCodeRepository>();
        _emailServiceMock = new Mock<IEmailService>();

        _profileService = new ProfileService(
            _userRepositoryMock.Object,
            _roleRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _httpContextAccessorMock.Object,
            _verificationCodeRepositoryMock.Object,
            _emailServiceMock.Object,
            _profileRepositoryMock.Object);
    }

    [Fact]
    public async Task GetAllProfiles_ReturnsProfiles()
    {
        // Arrange
        var profiles = new List<Profile>
        {
            new Profile { Id = 1, UserId = 1, DateOfBirth = new DateTime(2000, 1, 1) },
            new Profile { Id = 2, UserId = 2, DateOfBirth = new DateTime(1990, 1, 1) }
        };

        _profileRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(profiles);
        _userRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(new List<User>
        {
            new User { Id = 1, Email = "user1@example.com" },
            new User { Id = 2, Email = "user2@example.com" }
        });

        // Act
        var result = await _profileService.GetAllProfiles();

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count);
    }

    [Fact]
    public async Task GetProfile_ReturnsProfile()
    {
        // Arrange
        var profile = new Profile { Id = 1, UserId = 1, DateOfBirth = new DateTime(2000, 1, 1) };
        var user = new User { Id = 1, Email = "user1@example.com" };

        _profileRepositoryMock.Setup(repo => repo.GetAsync(1)).ReturnsAsync(profile);
        _userRepositoryMock.Setup(repo => repo.GetAsync(1)).ReturnsAsync(user);

        // Act
        var result = await _profileService.GetProfile(1);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal(profile.Id, result.Value.Id);
        Assert.Equal(user.Email, result.Value.Email);
    }

    [Fact]
    public async Task CreateProfile_ReturnsSuccess()
    {
        // Arrange
        var user = new User { Id = 1, Email = "user1@example.com" };
        var request = new ProfileRequest
        {
            DateOfBirth = new DateTime(2000, 1, 1),
            Gender = "Male",
            Height = 180,
            Weight = 75,
            Nationality = "Nigerian",
            DietType = "Vegetarian"
        };

        _userRepositoryMock.Setup(repo => repo.GetAsync(1)).ReturnsAsync(user);

        // Act
        var result = await _profileService.CreateProfile(1, request);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Contains("Check Your Mail", result.Message);
    }

    [Fact]
    public async Task UpdateProfile_ReturnsSuccess()
    {
        // Arrange
        var user = new User { Id = 1, Email = "user1@example.com" };
        var profile = new Profile { Id = 1, UserId = user.Id, DateOfBirth = new DateTime(2000, 1, 1) };
        var request = new ProfileRequest
        {
            DateOfBirth = new DateTime(2001, 1, 1),
            Gender = "Female",
            Height = 170,
            Weight = 65,
            Nationality = "Nigerian",
            DietType = "Vegan"
        };

        _profileRepositoryMock.Setup(repo => repo.GetAsync(1)).ReturnsAsync(profile);
        _userRepositoryMock.Setup(repo => repo.GetAsync(user.Email)).ReturnsAsync(user);

        // Act
        var result = await _profileService.UpdateProfile(1, request);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("User updated successfully.", result.Message);
    }

    // Additional tests can be written for other methods
}
