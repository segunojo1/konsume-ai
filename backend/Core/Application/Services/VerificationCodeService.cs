using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Models;
namespace KONSUME.Core.Application.Services
{
    public class VerificationCodeService : IVerificationCodeService
    {
        private readonly IEmailService _mailService;
        private readonly IVerificationCodeRepository _verificationCodeRepository;
        private readonly IUserRepository _userRepository;

        public VerificationCodeService(IEmailService mailService,  IVerificationCodeRepository verificationCodeRepository, IUserRepository userRepository)
        {
            _mailService = mailService;
            _verificationCodeRepository = verificationCodeRepository;
            _userRepository = userRepository;
        }

        public async Task<BaseResponse<VerificationCodeDto>> SendForgetPasswordVerificationCode(string email)
        {
            var user = await _userRepository.GetAsync(email);
            if (user == null)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "Email not found",
                    IsSuccessful = false
                };
            }
            var code = await _verificationCodeRepository.Get(x => x.Id == user.Id);
            if (code == null)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "No Code has been sent to at registration point",
                    IsSuccessful = false
                };
            }
            int random = new Random().Next(10000, 99999);
            code.Code = random;
            code.CreatedOn = DateTime.Now;
            var mailRequest = new MailRequests
            {
                Subject = "Reset Password",
                ToEmail = user.Email,
                HtmlContent = $"<html><body><h1>Hello {user.FirstName}, Welcome</h1><h4>Your Password reset code is {code.Code} to reset your password</h4></body></html>",
            };
            await _mailService.SendEmailClient(mailRequest.HtmlContent, mailRequest.Subject, mailRequest.ToEmail);
            user.IsDeleted = true;
            _userRepository.Update(user);
            _verificationCodeRepository.Update(code);
            return new BaseResponse<VerificationCodeDto>
            {
                Message = "Reset Password Code Successfully Reset",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse<VerificationCodeDto>> UpdateVerificationCode(int id)
        {
            var user = await _userRepository.GetAsync(id);
            if (user == null)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "User not found",
                    IsSuccessful = false
                };
            }
            var code = await _verificationCodeRepository.Get(x => x.UserId == id);
            if (code == null)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "No code has been sent to you before",
                    IsSuccessful = false
                };
            }
            int random = new Random().Next(10000, 99999);
            code.Code = random;
            code.CreatedOn = DateTime.Now;
            var mailRequest = new MailRequests
            {
                Subject = "Confirmation Code",
                ToEmail = user.Email,
                HtmlContent = $"<html><body><h1>Hello {user.FirstName}, Welcome to KONSUME.</h1><h4>Your confirmation code is {code.Code} to continue with the registration</h4></body></html>",
            };
            await _mailService.SendEmailClient(mailRequest.HtmlContent, mailRequest.Subject, mailRequest.ToEmail);
            _verificationCodeRepository.Update(code);
            return new BaseResponse<VerificationCodeDto>
            {
                Message = "Code Successfully resent",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse<VerificationCodeDto>> VerifyCode(int id, int verificationcode)
        {
            var user = await _userRepository.GetAsync(id);
            var code = await _verificationCodeRepository.Get(x => x.Code == verificationcode && user.Id == id);
            if (code == null)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "invalid code",
                    IsSuccessful = false
                };
            }
            else if ((DateTime.UtcNow - code.CreatedOn).TotalSeconds > 400)
            {
                return new BaseResponse<VerificationCodeDto>
                {
                    Message = "Code Expired",
                    IsSuccessful = false,
                };
            }
            user.IsDeleted = false;
            _userRepository.Update(user);
            return new BaseResponse<VerificationCodeDto>
            {
                Message = "Email Successfully Verified",
                IsSuccessful = true,
            };
        }
    }
}
