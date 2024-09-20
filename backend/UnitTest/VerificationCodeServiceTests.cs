using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models.Entities;
using Moq;
using Xunit;

public class VerificationCodeServiceTests
{
    private readonly Mock<IEmailService> _mailServiceMock;
    private readonly Mock<IVerificationCodeRepository> _verificationCodeRepositoryMock;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly VerificationCodeService _verificationCodeService;

    public VerificationCodeServiceTests()
    {
        _mailServiceMock = new Mock<IEmailService>();
        _verificationCodeRepositoryMock = new Mock<IVerificationCodeRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _verificationCodeService = new VerificationCodeService(
            _mailServiceMock.Object,
            _verificationCodeRepositoryMock.Object,
            _userRepositoryMock.Object);
    }

    [Fact]
    public async Task SendForgetPasswordVerificationCode_UserNotFound_ReturnsError()
    {
        // Arrange
        string email = "test@example.com";
        _userRepositoryMock.Setup(repo => repo.GetAsync(email)).ReturnsAsync((User)null); // User not found

        // Act
        var result = await _verificationCodeService.SendForgetPasswordVerificationCode(email);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Email not found", result.Message);
    }

    [Fact]
    public async Task SendForgetPasswordVerificationCode_NoCodeSent_ReturnsError()
    {
        // Arrange
        string email = "test@example.com";
        var user = new User { Id = 1, Email = email, FirstName = "Test" };
        _userRepositoryMock.Setup(repo => repo.GetAsync(email)).ReturnsAsync(user);
        _verificationCodeRepositoryMock.Setup(repo => repo.Get(x => x.Id == user.Id)).ReturnsAsync((VerificationCode)null); // No code found

        // Act
        var result = await _verificationCodeService.SendForgetPasswordVerificationCode(email);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("No Code has been sent to at registration point", result.Message);
    }

    [Fact]
    public async Task SendForgetPasswordVerificationCode_SuccessfulCodeSent()
    {
        // Arrange
        string email = "test@example.com";
        var user = new User { Id = 1, Email = email, FirstName = "Test" };
        var code = new VerificationCode { Id = user.Id };

        _userRepositoryMock.Setup(repo => repo.GetAsync(email)).ReturnsAsync(user);
        _verificationCodeRepositoryMock.Setup(repo => repo.Get(x => x.Id == user.Id)).ReturnsAsync(code);
        _mailServiceMock.Setup(mail => mail.SendEmailClient(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                        .Returns(Task.CompletedTask);

        // Act
        var result = await _verificationCodeService.SendForgetPasswordVerificationCode(email);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Reset Password Code Successfully Reset", result.Message);
        Assert.True(code.CreatedOn > DateTime.MinValue); // Ensure code was created
    }

    [Fact]
    public async Task UpdateVerificationCode_UserNotFound_ReturnsError()
    {
        // Arrange
        int userId = 1;
        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync((User)null); // User not found

        // Act
        var result = await _verificationCodeService.UpdateVerificationCode(userId);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("User not found", result.Message);
    }

    [Fact]
    public async Task UpdateVerificationCode_NoPreviousCode_ReturnsError()
    {
        // Arrange
        int userId = 1;
        var user = new User { Id = userId, Email = "test@example.com", FirstName = "Test" };
        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync(user); // No code found

        // Act
        var result = await _verificationCodeService.UpdateVerificationCode(userId);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("No code has been sent to you before", result.Message);
    }

    [Fact]
    public async Task UpdateVerificationCode_SuccessfulCodeUpdate()
    {
        // Arrange
        int userId = 1;
        var user = new User { Id = userId, Email = "test@example.com", FirstName = "Test" };
        var code = new VerificationCode { UserId = userId };

        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync(user);
        _mailServiceMock.Setup(mail => mail.SendEmailClient(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                        .Returns(Task.CompletedTask);

        // Act
        var result = await _verificationCodeService.UpdateVerificationCode(userId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Code Successfully resent", result.Message);
        Assert.True(code.CreatedOn > DateTime.MinValue); // Ensure code was updated
    }

    [Fact]
    public async Task VerifyCode_UserNotFound_ReturnsError()
    {
        // Arrange
        int userId = 1;
        int verificationCode = 12345;
        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync((User)null); // User not found

        // Act
        var result = await _verificationCodeService.VerifyCode(userId, verificationCode);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("invalid code", result.Message);
    }

    [Fact]
    public async Task VerifyCode_InvalidCode_ReturnsError()
    {
        // Arrange
        int userId = 1;
        int verificationCode = 12345;
        var user = new User { Id = userId };
        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync(user);

        // Act
        var result = await _verificationCodeService.VerifyCode(userId, verificationCode);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("invalid code", result.Message);
    }

    [Fact]
    public async Task VerifyCode_CodeExpired_ReturnsError()
    {
        // Arrange
        int userId = 1;
        int verificationCode = 12345;
        var user = new User { Id = userId };
        var code = new VerificationCode { Code = verificationCode, CreatedOn = DateTime.UtcNow.AddSeconds(-401) }; // Expired code

        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync(user);

        // Act
        var result = await _verificationCodeService.VerifyCode(userId, verificationCode);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Code Expired", result.Message);
    }

    [Fact]
    public async Task VerifyCode_SuccessfulVerification()
    {
        // Arrange
        int userId = 1;
        int verificationCode = 12345;
        var user = new User { Id = userId, Email = "test@example.com", FirstName = "Test", IsDeleted = true };
        var code = new VerificationCode { Code = verificationCode, CreatedOn = DateTime.UtcNow };

        _userRepositoryMock.Setup(repo => repo.GetAsync(userId)).ReturnsAsync(user);

        // Act
        var result = await _verificationCodeService.VerifyCode(userId, verificationCode);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Email Successfully Verified", result.Message);
        Assert.False(user.IsDeleted); // Ensure user is marked as not deleted
    }
}
