using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StreakController : ControllerBase
{
    private readonly IStreakService _streakService;

    public StreakController(IStreakService streakService)
    {
        _streakService = streakService;
    }

    [HttpGet("update-reading-streak")]
    public async Task<IActionResult> UpdateStreak([FromQuery] int profileId)
    {

        try
        {
            var streak = await _streakService.UpdateReadingStreakAsync(profileId);

            if (!streak.IsSuccessful)
            {
                return BadRequest(streak);
            }

            return Ok(streak);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "An error occurred while updating the streak.", Details = ex.Message });
        }
    }



    // GET: api/Streak/GetStreakCount/{profileId}
    [HttpGet("GetStreakCount/{profileId}")]
    public async Task<IActionResult> GetStreakCount(int profileId)
    {
        try
        {
            // Get the streak count using the service method
            int streakCount = await _streakService.GetStreakCountByProfileIdAsync(profileId);

            // Return the streak count as a JSON response
            return Ok(new { ProfileId = profileId, StreakCount = streakCount });
        }
        catch (Exception ex)
        {
            // Handle any exceptions and return a 500 status code
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    
}
