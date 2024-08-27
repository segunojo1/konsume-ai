using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using System.Security.Claims;
using KONSUME.Models.ProfileModel;
using KONSUME.Core.Domain.Enum;
using MailKit;
using Microsoft.AspNetCore.Http.HttpResults;
using KONSUME.Models.UserModel;

namespace KONSUME.Core.Application.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IHttpContextAccessor _httpContext;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;
        private readonly IProfileRepository _profileRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVerificationCodeRepository _verificationCodeRepository;
        private readonly IEmailService _emailService;
        public ProfileService(IUserRepository userRepository, IRoleRepository roleRepository, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContext, IVerificationCodeRepository verificationCodeRepository, IEmailService emailService,
            IProfileRepository profileRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _unitOfWork = unitOfWork;
            _httpContext = httpContext;
            _verificationCodeRepository = verificationCodeRepository;
            _emailService = emailService;
            _profileRepository = profileRepository;
        }

        public async Task<BaseResponse<ICollection<ProfileResponse>>> GetAllProfiles()
        {
            var profiles = await _profileRepository.GetAllAsync();
            var userIds = profiles.Select(p => p.UserId).ToList();

            // Retrieve all users
            var allUsers = await _userRepository.GetAllAsync();

            // Filter users based on the user IDs present in the profiles
            var users = allUsers.Where(u => userIds.Contains(u.Id)).ToList();

            // Create a dictionary for quick lookup of users by their ID
            var userDictionary = users.ToDictionary(u => u.Id, u => u);
            var profileResponses = profiles.Select(profile =>
            {
                var user = userDictionary.ContainsKey(profile.UserId) ? userDictionary[profile.UserId] : null;
                var today = DateTime.UtcNow;
                var age = today.Year - profile.DateOfBirth.Year;
                if (profile.DateOfBirth.Date > today.AddYears(-age)) age--;

                return new ProfileResponse
                {
                    Id = profile.Id,
                    Age = age,
                    Email = user?.Email, // Ensure null check for user
                    DateOfBirth = profile.DateOfBirth,
                    Gender = (Domain.Enum.Gender)(int)profile.Gender,
                    Height = profile.Height,
                    Weight = profile.Weight,
                    UserGoals = profile.UserGoals,
                    Allergies = profile.Allergies,
                    Nationality = profile.Nationality,
                    DietType = profile.DietType,
                };
            }).ToList();

            return new BaseResponse<ICollection<ProfileResponse>>
            {
                Message = "List of users",
                IsSuccessful = true,
                Value = profileResponses
            };


        }



        public async Task<BaseResponse<bool>> GetProfileByUserId(int id)
        {
            var exist = await _profileRepository.GetProfileByUserIdAsync(id);
            if (exist)
            {
                return new BaseResponse<bool>
                {
                    IsSuccessful = true,
                    Message = "Profile successfully found",
                    Value = exist
                };
            }

            return new BaseResponse<bool>
            {
                IsSuccessful = true,
                Message = "Profile not foud found",
                Value = exist
            };
        }

        public async Task<BaseResponse<ProfileResponse>> GetProfile(int id)
        {
            // Retrieve the profile from the repository
            var profile = await _profileRepository.GetAsync(id);
            if (profile == null)
            {
                return new BaseResponse<ProfileResponse>
                {
                    Message = "User not found",
                    IsSuccessful = false
                };
            }

            // Retrieve the associated user from the repository
            var user = await _userRepository.GetAsync(profile.UserId);
            if (user == null)
            {
                return new BaseResponse<ProfileResponse>
                {
                    Message = "User data is incomplete",
                    IsSuccessful = false
                };
            }

            // Calculate the user's age accurately
            var today = DateTime.UtcNow;
            var age = today.Year - profile.DateOfBirth.Year;
            if (profile.DateOfBirth.Date > today.AddYears(-age)) age--;

            // Create and return the response
            return new BaseResponse<ProfileResponse>
            {
                Message = "User successfully found",
                IsSuccessful = true,
                Value = new ProfileResponse
                {
                    Id = profile.Id,
                    Age = age,
                    Email = user.Email,
                    DateOfBirth = profile.DateOfBirth,
                    Gender = (Domain.Enum.Gender)(int)profile.Gender,
                    Height = profile.Height,
                    Weight = profile.Weight,
                    UserGoals = profile.UserGoals,
                    Allergies = profile.Allergies,
                    Nationality = profile.Nationality,
                    DietType = profile.DietType,
                     UserId = profile.UserId,
                    
                }
            };
        }



        public async Task<BaseResponse> RemoveProfile(int id)
        {
            var user = await _userRepository.GetAsync(id);
            if (user == null)
            {
                return new BaseResponse
                {
                    Message = "User does not exist",
                    IsSuccessful = false
                };
            }

            _userRepository.Remove(user);
            await _unitOfWork.SaveAsync();

            return new BaseResponse
            {
                Message = "User deleted successfully",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse<ProfileResponse>> CreateProfile(int Userid, ProfileRequest request)
        {
            var user = await _userRepository.GetAsync(Userid);
            if (user == null)
            {
                return new BaseResponse<ProfileResponse>
                {
                    Message = "User does not exist",
                    IsSuccessful = false
                };
            }

            var role = await _roleRepository.GetAsync(r => r.Name.ToLower() == "patient");
            if (role == null)
            {
                return new BaseResponse<ProfileResponse>
                {
                    Message = $"Role with id '{role.Id}' does not exists",
                    IsSuccessful = false
                };
            }
            var profile = user.Profile ?? new Profile();
            profile.DateOfBirth = DateTime.SpecifyKind(request.DateOfBirth, DateTimeKind.Utc);
            if (string.Equals(request.Gender, "Male", StringComparison.OrdinalIgnoreCase))
            {
                profile.Gender = Domain.Enum.Gender.Male;
            }
            else if (string.Equals(request.Gender, "Female", StringComparison.OrdinalIgnoreCase))
            {
                profile.Gender = Domain.Enum.Gender.Female;
            }
            else
            {
                return new BaseResponse<ProfileResponse>
                {
                    Message = "Invalid value for Gender. Please provide 'Male' or 'Female'.",
                    IsSuccessful = false
                };
            }
            profile.Height = request.Height;
            profile.Weight = request.Weight;
            profile.UserGoals = request.UserGoals;
            profile.Allergies = request.Allergies;
            profile.Nationality = request.Nationality;
            profile.DietType = request.DietType;
            profile.UserId = user.Id;
            profile.User = user;
            profile.DateCreated = DateTime.UtcNow;
            profile.IsDeleted = false;
            profile.CreatedBy = "1";


            try
            {
                if (user.Profile == null)
                    await _profileRepository.AddAsync(profile);
                _roleRepository.Update(role);
                await _emailService.SendNotificationToUserAsync(profile);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred while sending email: {ex.Message}");
                return new BaseResponse<ProfileResponse>
                {
                    Message = $"An error occurred while sending email{ex.Message}",
                    IsSuccessful = false
                };
            }
            await _unitOfWork.SaveAsync();

            return new BaseResponse<ProfileResponse>
            {
                Message = "Welcome Onboard, Check Your Mail",
                IsSuccessful = true,
                Value = new ProfileResponse
                {
                    Id = profile.Id,
                    Age = DateTime.UtcNow.Year - profile.DateOfBirth.Year,
                    Email = user.Email,
                    DateOfBirth = profile.DateOfBirth,
                    Gender = (Domain.Enum.Gender)(int)profile.Gender,
                    Height = profile.Height,
                    Weight = profile.Weight,
                    UserGoals = profile.UserGoals,
                    Allergies = profile.Allergies,
                    Nationality = profile.Nationality,
                    DietType = profile.DietType,
                }
            };
        }


        public async Task<BaseResponse> UpdateProfile(int id, ProfileRequest request)
        {
            try
            {
                var profile = await _profileRepository.GetAsync(id);
                if (profile == null)
                {
                    return new BaseResponse
                    {
                        Message = "Profile does not exist.",
                        IsSuccessful = false
                    };
                }

                var user = await _userRepository.GetAsync(profile.User.Email);
                if (user == null)
                {
                    return new BaseResponse
                    {
                        Message = "User associated with the profile does not exist.",
                        IsSuccessful = false
                    };
                }

                var formerRole = await _roleRepository.GetAsync(user.RoleId);
                if (formerRole == null)
                {
                    return new BaseResponse
                    {
                        Message = "Former role does not exist.",
                        IsSuccessful = false
                    };
                }

                formerRole.Users.Remove(user);
                _roleRepository.Update(formerRole);

                var exists = await _profileRepository.ExistsAsync(profile.User.Email, id);
                if (exists)
                {
                    return new BaseResponse
                    {
                        Message = "Email already exists!",
                        IsSuccessful = false
                    };
                }

                var role = await _roleRepository.GetAsync(r => r.Name.ToLower() == "patient");
                if (role == null)
                {
                    return new BaseResponse
                    {
                        Message = "Role does not exist.",
                        IsSuccessful = false
                    };
                }

                var loginUserId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
                if (loginUserId == null)
                {
                    return new BaseResponse
                    {
                        Message = "User not logged in.",
                        IsSuccessful = false
                    };
                }

                profile.DateOfBirth = DateTime.SpecifyKind(request.DateOfBirth, DateTimeKind.Utc);
                profile.Gender = string.Equals(request.Gender, "Male", StringComparison.OrdinalIgnoreCase)
                    ? Domain.Enum.Gender.Male
                    : Domain.Enum.Gender.Female;
                profile.Height = request.Height;
                profile.Weight = request.Weight;
                profile.UserGoals = request.UserGoals;
                profile.Allergies = request.Allergies;
                profile.Nationality = request.Nationality;
                profile.DietType = request.DietType;
                profile.UserId = user.Id;
                profile.User = user;
                profile.ModifiedBy = loginUserId;
                profile.DateModified = DateTime.UtcNow;
                profile.IsDeleted = false;
                profile.CreatedBy = "1"; // Adjust this if needed

                role.Users.Add(user);
                _roleRepository.Update(role);
                _userRepository.Update(user);
                _profileRepository.Update(profile);
                await _emailService.SendProfileUpdateNotificationAsync(profile);

                await _unitOfWork.SaveAsync();

                return new BaseResponse
                {
                    Message = "User updated successfully.",
                    IsSuccessful = true
                };
            }
            catch (Exception ex)
            {
                // Log detailed information
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return new BaseResponse
                {
                    Message = $"An error occurred: {ex.Message}",
                    IsSuccessful = false
                };
            }
        }


    }
}

