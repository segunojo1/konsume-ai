using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models;
using Microsoft.AspNetCore.Mvc;

namespace KONSUME.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInteractionsController : ControllerBase
    {
        private readonly IUserInteractionService _service;

        public UserInteractionsController(IUserInteractionService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> SaveUserInteraction([FromBody] UserInteractionDto dto)
        {
            var interaction = await _service.SaveUserInteractionAsync(dto.Question, dto.Response);
            return Ok(interaction);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserInteractions()
        {
            var interactions = await _service.GetUserInteractionsAsync();
            return Ok(interactions);
        }
    }
}

