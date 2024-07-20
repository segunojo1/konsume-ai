using KONSUME.Models.UserModel;
using KONSUME.Models;
using KONSUME.Models.ProfileModel;

namespace KONSUME.Core.Application.Interfaces.Services
{
    public interface IProfileService
    {
        Task<BaseResponse<ProfileResponse>> GetProfile(int id);
        Task<BaseResponse<ICollection<ProfileResponse>>> GetAllProfiles();
        Task<BaseResponse> RemoveProfile(int id);
        Task<BaseResponse<bool>> GetProfileByUserId(int id);
        Task<BaseResponse<ProfileResponse>> CreateProfile(int Userid, ProfileRequest request);
        Task<BaseResponse> UpdateProfile(int id, ProfileRequest request);
    }
}
