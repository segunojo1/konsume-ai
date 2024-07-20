using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models;
using KONSUME.Models.ProfileModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KONSUME.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProfile(int userId, [FromBody] ProfileRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _profileService.CreateProfile(userId, request);
            if (!response.IsSuccessful)
            {
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllProfiles()
        {
            var response = await _profileService.GetAllProfiles();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var response = await _profileService.GetProfile(id);
            if (!response.IsSuccessful || response == null)
            {
                return NotFound(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("profileByUserId")]
        public async Task<IActionResult> GetProfileByUserId(int id)
        {
            var response = await _profileService.GetProfileByUserId(id);
            if (!response.IsSuccessful || response == null)
            {
                return NotFound(response.Message);
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] ProfileRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _profileService.UpdateProfile(id, request);
            if (!response.IsSuccessful)
            {
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveProfile(int id)
        {
            var response = await _profileService.RemoveProfile(id);
            if (!response.IsSuccessful)
            {
                return NotFound(response.Message);
            }

            return Ok(response);
        }
    }
}

