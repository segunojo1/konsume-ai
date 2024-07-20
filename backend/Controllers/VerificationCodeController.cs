using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models;
using Microsoft.AspNetCore.Mvc;

namespace KONSUME.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VerificationCodeController :ControllerBase
    {
        private readonly IVerificationCodeService _verificationCodeService;
        public VerificationCodeController(IVerificationCodeService verificationCodeService)
        {
            _verificationCodeService = verificationCodeService;
        }
        [HttpGet("VerifyCode/{code}/{id}")]
        public async Task<IActionResult> VerifyCode([FromRoute] int code, int id)
        {
            var verifycode =  await _verificationCodeService.VerifyCode(id, code);
            if (verifycode.IsSuccessful == false)
            {
                return BadRequest(verifycode);
            }
            return Ok(verifycode);
        }
        [HttpPut("UpdateCode/{id}")]
        public  async Task<IActionResult> UpdateCode([FromRoute] int id)
        {
            var code = await _verificationCodeService.UpdateVerificationCode(id);
            if (code.IsSuccessful == false)
            {
                return BadRequest(code);
            }
            return Ok(code);
        }
        [HttpPut("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordRequestModel model)
        {
            var reset = await  _verificationCodeService.SendForgetPasswordVerificationCode(model.Email);
            if (reset.IsSuccessful == false)
            {
                return BadRequest(reset);
            }
            return Ok(reset);
        }
    }
}

