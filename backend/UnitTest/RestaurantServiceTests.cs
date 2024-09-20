using DaticianProj.Core.Domain.Entities;
using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models.ProfileModel;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using Moq;
using Xunit;

public class RestaurantServiceTests
{
    private readonly Mock<IRoleRepository> _roleRepositoryMock;
    private readonly Mock<IRestaurantRepository> _restaurantRepositoryMock;
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly RestaurantService _restaurantService;

    public RestaurantServiceTests()
    {
        _roleRepositoryMock = new Mock<IRoleRepository>();
        _restaurantRepositoryMock = new Mock<IRestaurantRepository>();
        _userRepositoryMock = new Mock<IUserRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _emailServiceMock = new Mock<IEmailService>();
        _restaurantService = new RestaurantService(
            _roleRepositoryMock.Object,
            _unitOfWorkMock.Object,
            null, // Mock IHttpContextAccessor if needed
            _emailServiceMock.Object,
            _restaurantRepositoryMock.Object,
            _userRepositoryMock.Object
        );
    }

    [Fact]
    public async Task GetAllRestaurant_ReturnsListOfRestaurants()
    {
        // Arrange
        var restaurants = new List<Restaurant>
        {
            new Restaurant { Id = 1, Name = "Restaurant A" },
            new Restaurant { Id = 2, Name = "Restaurant B" }
        };
        _restaurantRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(restaurants);

        // Act
        var result = await _restaurantService.GetAllRestaurant();

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count);
    }

    [Fact]
    public async Task CreateRestaurant_ReturnsSuccess()
    {
        // Arrange
        var request = new RestaurantRequest
        {
            Name = "New Restaurant",
            Email = "test@example.com",
            Password = "Password123",
            DateOfEstablishment = DateTime.UtcNow,
            Location = "Location",
            CAC = "CAC123"
        };

        _restaurantRepositoryMock.Setup(repo => repo.ExistsAsync(request.Email)).ReturnsAsync(false);
        _roleRepositoryMock.Setup(repo => repo.GetAsync(r => r.Name == "restaurant")).ReturnsAsync(new Role { Id = 1 });

        // Act
        var result = await _restaurantService.CreateRestaurant(request);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Restaurant created successfully.", result.Message);
    }

    // Add more tests for UpdateRestaurant, RemoveRestaurant, GetRestaurant, etc.
}
