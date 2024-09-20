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

        _userService = new UserService(
            _userRepositoryMock.Object,
            _roleRepositoryMock.Object,
            _restaurantRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _httpContextMock.Object,
            _verificationCodeRepositoryMock.Object,
            _emailServiceMock.Object);
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

    // Additional tests can be added here for other methods
}

