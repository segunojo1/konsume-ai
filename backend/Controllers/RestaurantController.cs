using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models.ProfileModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace KONSUME.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        private ILogger<RestaurantController> _logger;

        public RestaurantController(IRestaurantService restaurantService, ILogger<RestaurantController> logger)
        {
            _restaurantService = restaurantService;
            _logger = logger;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllRestaurants()
        {
            var response = await _restaurantService.GetAllRestaurant();
            if (response.IsSuccessful)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurant(int id)
        {

            var response = await _restaurantService.GetRestaurant(id);
            if (!response.IsSuccessful || response == null)
            {
                _logger.LogError("User not found: {UserId}", id);
                return NotFound(new { Message = response.Message });
            }
            var result = new JsonResult(response.Value)
            {
                StatusCode = (int?)HttpStatusCode.OK
            };
            return result;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRestaurantByUserId(int userId)
        {
            var response = await _restaurantService.GetRestaurantByUserId(userId);
            if (!response.IsSuccessful || response == null)
            {
                _logger.LogError("User not found: {UserId}", userId);
                return NotFound(new { Message = response.Message });
            }
            var result = new JsonResult(response.Value)
            {
                StatusCode = (int?)HttpStatusCode.OK
            };
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRestaurant([FromBody] RestaurantRequest request)
        {
            var response = await _restaurantService.CreateRestaurant(request);
            if (response.IsSuccessful)
            {
                return CreatedAtAction(nameof(GetRestaurant), new { id = response.Value.Id }, response);
            }
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRestaurant(int id, [FromBody] RestaurantRequest request)
        {
            var response = await _restaurantService.UpdateRestaurant(id, request);
            if (response.IsSuccessful)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveRestaurant(int id)
        {
            var response = await _restaurantService.RemoveRestaurant(id);
            if (response.IsSuccessful)
            {
                _logger.LogInformation("User deleted successfully: {UserId}", id);
                return Ok(new { Message = response.Message });
            }
            _logger.LogError("User deletion failed: {UserMessage}", response.Message);
            return BadRequest(new { Message = response.Message });
        }
    }
}

