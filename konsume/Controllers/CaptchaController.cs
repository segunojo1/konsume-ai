using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace KONSUME.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CaptchaController : ControllerBase
    {
        private const string SecretKey = "6LejQacnAAAAAHdPPHqycAKXa6L_tsnX9guHZ27H";

        [HttpPost("verify")]
        public async Task<ActionResult> VerifyCaptcha([FromForm] string gRecaptchaResponse)
        {
            if (string.IsNullOrEmpty(gRecaptchaResponse))
            {
                return BadRequest("CAPTCHA response is required.");
            }

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={SecretKey}&response={gRecaptchaResponse}");

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Error verifying CAPTCHA.");
                }

                var responseBody = await response.Content.ReadAsStringAsync();
                dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(responseBody);

                if (data.success == true)
                {
                    return Ok("Signup successful!");
                }
                else
                {
                    return BadRequest("CAPTCHA verification failed.");
                }
            }
        }
    }
}

