using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models.RoleModel;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using Moq;
using System.Security.Claims;
using Xunit;

public class RoleServiceTests
{
    private readonly Mock<IRoleRepository> _roleRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IHttpContextAccessor> _httpContextAccessorMock;
    private readonly RoleService _roleService;

    public RoleServiceTests()
    {
        _roleRepositoryMock = new Mock<IRoleRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _httpContextAccessorMock = new Mock<IHttpContextAccessor>();

        _roleService = new RoleService(
            _roleRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _httpContextAccessorMock.Object);
    }

    private void SetupHttpContext(string userId)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId)
        };

        var identity = new ClaimsIdentity(claims);
        var principal = new ClaimsPrincipal(identity);
        var context = new DefaultHttpContext
        {
            User = principal
        };

        _httpContextAccessorMock.Setup(_ => _.HttpContext).Returns(context);
    }

    [Fact]
    public async Task CreateRole_RoleAlreadyExists_ReturnsError()
    {
        // Arrange
        var request = new RoleRequest { Name = "Admin" };
        _roleRepositoryMock.Setup(repo => repo.ExistAsync(request.Name)).ReturnsAsync(true);

        // Act
        var result = await _roleService.CreateRole(request);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Role already exists", result.Message);
    }

    [Fact]
    public async Task CreateRole_SuccessfulCreation()
    {
        // Arrange
        var request = new RoleRequest { Name = "Admin" };
        SetupHttpContext("user123");
        _roleRepositoryMock.Setup(repo => repo.ExistAsync(request.Name)).ReturnsAsync(false);

        // Act
        var result = await _roleService.CreateRole(request);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Role created successfully", result.Message);
        _roleRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<Role>()), Times.Once);
        _unitOfWorkMock.Verify(uow => uow.SaveAsync(), Times.Once);
    }

    [Fact]
    public async Task GetAllRole_ReturnsRoles()
    {
        // Arrange
        var roles = new List<Role>
        {
            new Role { Id = 1, Name = "Admin" },
            new Role { Id = 2, Name = "User" }
        };

        _roleRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(roles);

        // Act
        var result = await _roleService.GetAllRole();

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("List of roles", result.Message);
        Assert.Equal(2, result.Value.Count);
    }

    [Fact]
    public async Task GetRole_RoleNotFound_ReturnsError()
    {
        // Arrange
        int roleId = 1;
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync((Role)null);

        // Act
        var result = await _roleService.GetRole(roleId);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Role not found", result.Message);
    }

    [Fact]
    public async Task GetRole_SuccessfulRetrieval()
    {
        // Arrange
        int roleId = 1;
        var role = new Role { Id = roleId, Name = "Admin" };
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync(role);

        // Act
        var result = await _roleService.GetRole(roleId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Role found successfully", result.Message);
        Assert.Equal(roleId, result.Value.Id);
    }

    [Fact]
    public async Task RemoveRole_RoleNotFound_ReturnsError()
    {
        // Arrange
        int roleId = 1;
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync((Role)null);

        // Act
        var result = await _roleService.RemoveRole(roleId);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Role does not exists", result.Message);
    }

    [Fact]
    public async Task RemoveRole_SuccessfulDeletion()
    {
        // Arrange
        int roleId = 1;
        var role = new Role { Id = roleId };
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync(role);

        // Act
        var result = await _roleService.RemoveRole(roleId);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Role deleted successfully", result.Message);
        _roleRepositoryMock.Verify(repo => repo.Remove(role), Times.Once);
        _unitOfWorkMock.Verify(uow => uow.SaveAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateRole_RoleNotFound_ReturnsError()
    {
        // Arrange
        int roleId = 1;
        var request = new RoleRequest { Name = "Admin" };
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync((Role)null);

        // Act
        var result = await _roleService.UpdateRole(roleId, request);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal("Role does not exists", result.Message);
    }

    [Fact]
    public async Task UpdateRole_RoleAlreadyExists_ReturnsError()
    {
        // Arrange
        int roleId = 1;
        var request = new RoleRequest { Name = "Admin" };
        var role = new Role { Id = roleId, Name = "User" };
        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync(role);
        _roleRepositoryMock.Setup(repo => repo.ExistAsync(request.Name, roleId)).ReturnsAsync(true);

        // Act
        var result = await _roleService.UpdateRole(roleId, request);

        // Assert
        Assert.False(result.IsSuccessful);
        Assert.Equal($"Role with name '{request.Name}' already exists", result.Message);
    }

    [Fact]
    public async Task UpdateRole_SuccessfulUpdate()
    {
        // Arrange
        int roleId = 1;
        var request = new RoleRequest { Name = "Admin" };
        SetupHttpContext("user123");
        var role = new Role { Id = roleId, Name = "User" };

        _roleRepositoryMock.Setup(repo => repo.GetAsync(roleId)).ReturnsAsync(role);
        _roleRepositoryMock.Setup(repo => repo.ExistAsync(request.Name, roleId)).ReturnsAsync(false);

        // Act
        var result = await _roleService.UpdateRole(roleId, request);

        // Assert
        Assert.True(result.IsSuccessful);
        Assert.Equal("Role updated successfully", result.Message);
        Assert.Equal(request.Name, role.Name);
        _roleRepositoryMock.Verify(repo => repo.Update(role), Times.Once);
        _unitOfWorkMock.Verify(uow => uow.SaveAsync(), Times.Once);
    }
}

