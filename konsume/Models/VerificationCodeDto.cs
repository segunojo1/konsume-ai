namespace KONSUME.Models
{
    public class VerificationCodeDto
    {
        public string Code { get; set; }
        public bool isExpired { get; set; }
    }

    public class ResetPasswordRequestModel
    {
        public string Email { get; set; }
    }
}
