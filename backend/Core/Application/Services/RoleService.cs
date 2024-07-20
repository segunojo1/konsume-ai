using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using KONSUME.Models.RoleModel;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using System.Security.Claims;

namespace KONSUME.Core.Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IHttpContextAccessor _httpContext;
        private readonly IRoleRepository _roleRepository;
        private readonly IUnitOfWork _unitOfWork;

        public RoleService(IRoleRepository roleRepository, IUnitOfWork unitOfWork, IHttpContextAccessor httpContext)
        {
            _roleRepository = roleRepository;
            _unitOfWork = unitOfWork;
            _httpContext = httpContext;
        }

        public async Task<BaseResponse> CreateRole(RoleRequest request)
        {
            var exists = await _roleRepository.ExistAsync(request.Name);
            if (exists)
            {
                return new BaseResponse
                {
                    Message = "Role already exists",
                    IsSuccessful = false
                };
            }

            var loginUserId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            var role = new Role
            {
                Name = request.Name,
                Description = request.Description ?? "This role has no description",
                CreatedBy = loginUserId
            };

            await _roleRepository.AddAsync(role);
            await _unitOfWork.SaveAsync();

            return new BaseResponse
            {
                Message = "Role created successfully",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse<ICollection<RoleResponse>>> GetAllRole()
        {
            var roles = await _roleRepository.GetAllAsync();

            return new BaseResponse<ICollection<RoleResponse>>
            {
                Message = "List of roles",
                IsSuccessful = true,
                Value = roles.Select(role => new RoleResponse
                {
                    Id = role.Id,
                    Name = role.Name,
                    Description = role.Description ?? "This role has no description"
                }).ToList()
            };
        }

        public async Task<BaseResponse<RoleResponse>> GetRole(int id)
        {
            var role = await _roleRepository.GetAsync(id);
            if (role == null)
            {
                return new BaseResponse<RoleResponse>
                {
                    Message = "Role not found",
                    IsSuccessful = false
                };
            }

            return new BaseResponse<RoleResponse>
            {
                Message = "Role found successfully",
                IsSuccessful = true,
                Value = new RoleResponse
                {
                    Id = role.Id,
                    Description = role.Description ?? "This role has no description",
                    Name = role.Name
                }
            };
        }

        public async Task<BaseResponse> RemoveRole(int id)
        {
            var role = await _roleRepository.GetAsync(id);
            if (role == null)
            {
                return new BaseResponse
                {
                    Message = "Role does not exists",
                    IsSuccessful = false
                };
            }

            _roleRepository.Remove(role);
            await _unitOfWork.SaveAsync();

            return new BaseResponse
            {
                Message = "Role deleted successfully",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse> UpdateRole(int id, RoleRequest request)
        {
            var role = await _roleRepository.GetAsync(id);
            if (role == null)
            {
                return new BaseResponse
                {
                    Message = "Role does not exists",
                    IsSuccessful = false
                };
            }

            var exists = await _roleRepository.ExistAsync(request.Name, id);
            if (exists)
            {
                return new BaseResponse
                {
                    Message = $"Role with name '{request.Name}' already exists",
                    IsSuccessful = false
                };
            }

            var loginUserId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;
            role.Name = request.Name;
            role.Description = request.Description ?? "This role has no description";
            role.DateModified = DateTime.UtcNow;
            role.ModifiedBy = loginUserId;

            _roleRepository.Update(role);
            await _unitOfWork.SaveAsync();

            return new BaseResponse
            {
                Message = "Role updated successfully",
                IsSuccessful = true
            };
        }
    }
}
