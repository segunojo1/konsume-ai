using Microsoft.AspNetCore.Mvc;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using KONSUME.Core.Application.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace KONSUME.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MealPlanController : ControllerBase
    {
        private readonly IMealPlanService _mealPlanService;

        public MealPlanController(IMealPlanService mealPlanService)
        {
            _mealPlanService = mealPlanService;
        }

        [HttpGet("GenMeal")]
        public async Task<IActionResult> GenerateMealPlan([FromQuery] int profileId)
        {
            if (profileId <= 0)
            {
                return BadRequest("Invalid user ID.");
            }

            var response = await _mealPlanService.Generate30DayMealPlanAsync(profileId);

            if (response.IsSuccessful)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(500, response.Message);
            }
        }


        [HttpPut("{profileId}/{mealId}")]
        public async Task<IActionResult> UpdateMealPlans([FromBody] MealPlans mealPlan, [FromRoute] int profileId)
        {
            var response = await _mealPlanService.UpdateMealPlans(mealPlan, profileId);

            if (response.IsSuccessful)
            {
                return Ok(response);
            }

            return BadRequest(response.Message);
        }

    }
}






