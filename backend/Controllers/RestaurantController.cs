using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models.ProfileModel;
using Microsoft.AspNetCore.Mvc;


namespace KONSUME.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
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
            if (response.IsSuccessful)
            {
                return Ok(response);
            }
            return NotFound(response);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRestaurantByUserId(int userId)
        {
            var response = await _restaurantService.GetRestaurantByUserId(userId);
            if (response.IsSuccessful)
            {
                return Ok(response);
            }
            return NotFound(response);
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
                return NoContent();
            }
            return NotFound(response);
        }
    }
}

