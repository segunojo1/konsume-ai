using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models.UserModel;
using Microsoft.AspNetCore.Mvc;

namespace KonsumeTestRun.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IIdentityService _identityService;
        private readonly IConfiguration _config;


        public AuthenticationController(IUserService userService, IIdentityService identityService, IConfiguration config)
        {
            _userService = userService;
            _identityService = identityService;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginRequestModel model)
        {
            var user = await _userService.Login(model);

            if (user.IsSuccessful == true)
            {
                var token = _identityService.GenerateToken(_config["Jwt:Key"], _config["Jwt:Issuer"], user.Value);
                return Ok(new { token, user.Value, user.Message });
            }
            else
            {
                return StatusCode(400, user.Message);
            }
        }

        [HttpPost("LoginWithGoogle/Token")]
        public async Task<IActionResult> LoginWithGoogle()
        {
            // Extract the ID Token from the Authorization header
            if (!Request.Headers.TryGetValue("Authorization", out var token) || string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { Message = "Authorization token is required." });
            }

            // Call the service to handle the login
            var user = await _userService.LoginWithGoogle(token.ToString().Replace("Bearer ", ""));

            if (user.IsSuccessful)
            {
                var accessToken = _identityService.GenerateToken(_config["Jwt:Key"], _config["Jwt:Issuer"], user.Value);
                return Ok(new { accessToken, user.Value, user.Message });
            }
            else
            {
                return BadRequest(user.Message);
            }
        }


        [HttpPost("LoginWithGoogle")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] GoogleUserInfo model)
        {
            if (model == null || string.IsNullOrEmpty(model.Token))
            {
                return BadRequest("Invalid request.");
            }

            var userResponse = await _userService.LoginWithGoogle(model);

            if (userResponse.IsSuccessful)
            {
                var token = _identityService.GenerateToken(_config["Jwt:Key"], _config["Jwt:Issuer"], userResponse.Value);
                return Ok(new
                {
                    token,
                    userResponse.Value,
                    userResponse.Message
                });
            }
            else
            {
                return StatusCode(400, userResponse.Message);
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] UserRequest request)
        {
            var user = await _userService.CreateUser(request);

            if (user.IsSuccessful == true)
            {
                return Ok(new { user.Value, user.Message });
            }
            else
            {
                return StatusCode(400, user.Message);
            }
        }
    }
}



