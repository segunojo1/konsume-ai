using KONSUME.Core.Domain.Entities;
using KONSUME.Core.Domain.Enum;

namespace KONSUME.Models.UserModel
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }

    public class LoginResponseModel : BaseResponse
    {

        public string Token { get; set; }

        public UserResponse Data { get; set; }


    }
}
