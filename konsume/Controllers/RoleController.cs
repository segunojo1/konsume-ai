using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models.RoleModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KonsumeTestRun.Controllers
{
    [Route("api/roles")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetAllRole();
            return Ok(roles.Value);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRole([FromRoute] int id)
        {
            var role = await _roleService.GetRole(id);
            if (role.IsSuccessful)
            {
                return Ok(role.Value);
            }
            return NotFound(role.Message);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRole([FromRoute] int id, [FromForm] RoleRequest request)
        {
            var role = await _roleService.UpdateRole(id, request);
            if (role.IsSuccessful)
            {
                return Ok(role.Message);
            }
            return BadRequest(role.Message);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRole([FromRoute] int id)
        {
            var role = await _roleService.RemoveRole(id);
            if (role.IsSuccessful)
            {
                return Ok(role.Message);
            }
            return BadRequest(role.Message);
        }
    }
}
