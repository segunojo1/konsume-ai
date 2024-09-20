using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using KONSUME.Models.UserModel;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

public class UserServiceTests
{
    private readonly UserService _userService;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IRoleRepository> _roleRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IHttpContextAccessor> _httpContextMock;
    private readonly Mock<IVerificationCodeRepository> _verificationCodeRepositoryMock;
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly Mock<IRestaurantRepository> _restaurantRepositoryMock;
    private readonly Mock<IHttpClientFactory> _httpClientFactoryMock;

    public UserServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _roleRepositoryMock = new Mock<IRoleRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _httpContextMock = new Mock<IHttpContextAccessor>();
        _verificationCodeRepositoryMock = new Mock<IVerificationCodeRepository>();
        _emailServiceMock = new Mock<IEmailService>();
        _restaurantRepositoryMock = new Mock<IRestaurantRepository>();
        _httpClientFactoryMock = new Mock<IHttpClientFactory>();

        _userService = new UserService(
            _userRepositoryMock.Object,
            _roleRepositoryMock.Object,
            _restaurantRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _httpContextMock.Object,
            _verificationCodeRepositoryMock.Object,
            _emailServiceMock.Object,
            _httpClientFactoryMock.Object);
    }

    [Fact]
    public async Task CreateUser_ShouldReturnSuccess_WhenUserIsCreated()
    {
        // Arrange
        var userRequest = new UserRequest
        {
            Email = "test@example.com",
            Password = "Password123",
            ConfirmPassword = "Password123",
            FirstName = "John",
            LastName = "Doe"
        };

        _restaurantRepositoryMock.Setup(x => x.ExistsAsync(userRequest.Email)).ReturnsAsync(false);
        _userRepositoryMock.Setup(x => x.ExistsAsync(userRequest.Email)).ReturnsAsync(false);

        // Act
        var result = await _userService.CreateUser(userRequest);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Check your email and complete your registration", result.Message);
    }

    [Fact]
    public async Task LoginWithGoogle_ShouldReturnSuccess_WhenUserExists()
    {
        // Arrange
        var googleUserInfo = new GoogleUserInfo { Email = "test@example.com", Token = "sampleToken" };
        var existingUser = new User { Id = 1, FirstName = "John", LastName = "Doe", Email = "test@example.com", RoleId = 1 };

        _userRepositoryMock.Setup(x => x.GetAsync(googleUserInfo.Email)).ReturnsAsync(existingUser);
        _roleRepositoryMock.Setup(x => x.GetAsync(existingUser.RoleId)).ReturnsAsync(new Role { Id = 1, Name = "patient" });

        // Act
        var result = await _userService.LoginWithGoogle(googleUserInfo);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Login Successfull", result.Message);
    }

    [Fact]
    public async Task LoginWithGoogle_ShouldCreateUser_WhenUserDoesNotExist()
    {
        // Arrange
        var googleUserInfo = new GoogleUserInfo { Email = "newuser@example.com", Token = "sampleToken", FullName = "New User" };
        var role = new Role { Id = 1, Name = "patient" };

        _userRepositoryMock.Setup(x => x.GetAsync(googleUserInfo.Email)).ReturnsAsync((User)null);

        // Act
        var result = await _userService.LoginWithGoogle(googleUserInfo);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("User created successfully.", result.Message);
    }

    // Additional tests can be added here for other methods
}

