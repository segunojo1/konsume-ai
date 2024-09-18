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
using KONSUME.Infrastructure.Repositories;
using DaticianProj.Core.Domain.Entities;
using KONSUME.Models.Entities;

namespace KONSUME.Core.Application.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IHttpContextAccessor _httpContext;
        private readonly IRoleRepository _roleRepository;
        private readonly IRestaurantRepository _restaurantRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVerificationCodeRepository _verificationCodeRepository;
        private readonly IEmailService _emailService;
        public RestaurantService(IRoleRepository roleRepository, IUnitOfWork unitOfWork,
            IHttpContextAccessor httpContext, IVerificationCodeRepository verificationCodeRepository, IEmailService emailService,
            IRestaurantRepository restaurantRepository)
        {
            _roleRepository = roleRepository;
            _unitOfWork = unitOfWork;
            _httpContext = httpContext;
            _verificationCodeRepository = verificationCodeRepository;
            _emailService = emailService;
            _restaurantRepository = restaurantRepository;
        }

        public async Task<BaseResponse<ICollection<RestaurantResponse>>> GetAllRestaurant()
        {
            var restaurants = await _restaurantRepository.GetAllAsync();

            var restaurantResponses = restaurants.Select(restaurant =>
            {

                return new RestaurantResponse
                {
                    Id = restaurant.Id,
                    Email = restaurant?.Email, // Ensure null check for user
                    CAC = restaurant.CAC,
                    DateOfEstablishment = restaurant.DateOfEstablishment,
                    Food = restaurant.Food,
                    Location = restaurant.Location,
                    Name = restaurant.Name,
                };
            }).ToList();

            return new BaseResponse<ICollection<RestaurantResponse>>
            {
                Message = "List of users",
                IsSuccessful = true,
                Value = restaurantResponses
            };


        }



        public async Task<BaseResponse<bool>> GetRestaurantByUserId(int id)
        {
            var exist = await _restaurantRepository.ExistsAsync(id);
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

        public async Task<BaseResponse<RestaurantResponse>> GetRestaurant(int id)
        {
            // Retrieve the profile from the repository
            var restaurant = await _restaurantRepository.GetAsync(id);
            if (restaurant == null)
            {
                return new BaseResponse<RestaurantResponse>
                {
                    Message = "User not found",
                    IsSuccessful = false
                };
            }

            // Retrieve the associated user from the repository
            var user = await _restaurantRepository.GetAsync(restaurant.Id);
            if (user == null)
            {
                return new BaseResponse<RestaurantResponse>
                {
                    Message = "User data is incomplete",
                    IsSuccessful = false
                };
            }


            // Create and return the response
            return new BaseResponse<RestaurantResponse>
            {
                Message = "User successfully found",
                IsSuccessful = true,
                Value = new RestaurantResponse
                {
                    Id = restaurant.Id,
                    Email = user.Email,
                    DateOfEstablishment = restaurant.DateOfEstablishment,
                    Name = restaurant.Name,
                    Location = restaurant.Location,
                    CAC = restaurant.CAC,
                    Food = restaurant.Food,
                }
            };
        }



        public async Task<BaseResponse> RemoveRestaurant(int id)
        {
            var restaurant = await _restaurantRepository.GetAsync(id);
            if (restaurant == null)
            {
                return new BaseResponse
                {
                    Message = "User does not exist",
                    IsSuccessful = false
                };
            }

            _restaurantRepository.Remove(restaurant);
            await _unitOfWork.SaveAsync();

            return new BaseResponse
            {
                Message = "User deleted successfully",
                IsSuccessful = true
            };
        }

        public async Task<BaseResponse<RestaurantResponse>> CreateRestaurant(RestaurantRequest request)
        {
            try
            {
                int randomCode = new Random().Next(10000, 99999);
                // Check if a restaurant with the same email already exists
                if (await _restaurantRepository.ExistsAsync(request.Email))
                {
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "A restaurant with this email already exists.",
                        IsSuccessful = false
                    };
                }

                // Validate the role
                var role = await _roleRepository.GetAsync(r => r.Name == "restaurant");
                if (role == null)
                {
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "Role does not exist.",
                        IsSuccessful = false
                    };
                }

                var newRestaurant = new Restaurant
                {
                    Name = request.Name,
                    Email = request.Email,
                    Password = request.Password,
                    DateOfEstablishment = DateTime.SpecifyKind(request.DateOfEstablishment, DateTimeKind.Utc),
                    Location = request.Location,
                    Food = request.Food,
                    CAC = request.CAC,
                    RoleId = role.Id,
                    Role = role,
                    DateCreated = DateTime.Now,
                    IsDeleted = false,
                };

                var code = new VerificationCode
                {
                    Code = randomCode,
                    RestaurantId = newRestaurant.Id,
                    DateCreated = DateTime.UtcNow,
                    IsDeleted = false,
                    Restaurant = newRestaurant,
                    CreatedOn = DateTime.UtcNow,
                };
                await _verificationCodeRepository.Create(code);

                // Send email with the confirmation code
                try
                {
                    var mailRequest = new MailRequests
                    {
                        Subject = "Confirmation Code",
                        ToEmail = newRestaurant.Email,
                        Title = "Your Confirmation Code",
                        HtmlContent = $"<html><body><h1>Hello {newRestaurant.Name}, Welcome to KONSUME.</h1><h4>Your confirmation code is {code.Code} to continue with the registration you've been added to wait-list</h4></body></html>"
                    };

                    await _emailService.SendEmailAsync(new MailRecieverDto { Name = newRestaurant.Name, Email = newRestaurant.Email }, mailRequest);

                    await _restaurantRepository.AddAsync(newRestaurant);
                    await _unitOfWork.SaveAsync();

                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "Restaurant created successfully.Check your mail for the verification code",
                        IsSuccessful = true,
                        Value = new RestaurantResponse
                        {
                            Id = newRestaurant.Id,
                            Email = newRestaurant.Email,
                            Name = newRestaurant.Name,
                            CAC = newRestaurant.CAC,
                            Food = newRestaurant.Food,
                            Location = newRestaurant.Location,
                        }
                    };
                }
                catch (Exception ex)
                {
                    // Log exception details (using a proper logging framework is recommended)
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = $"An error occurred while creating the restaurant: {ex.Message}",
                        IsSuccessful = false
                    };
                }
            }
            catch (Exception ex)
            {
                // Log exception details (using a proper logging framework is recommended)
                return new BaseResponse<RestaurantResponse>
                {
                    Message = $"An error occurred while creating the restaurant: {ex.Message}",
                    IsSuccessful = false
                };
            }
        }



        public async Task<BaseResponse<RestaurantResponse>> UpdateRestaurant(int id, RestaurantRequest request)
        {
            try
            {
                var existingRestaurant = await _restaurantRepository.GetAsync(id);
                if (existingRestaurant == null)
                {
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "Restaurant not found.",
                        IsSuccessful = false
                    };
                }
                var loginUserId = _httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
                if (loginUserId == null)
                {
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "User not logged in.",
                        IsSuccessful = false
                    };
                }
                // Validate the role
                var role = await _roleRepository.GetAsync(r => r.Name == "restaurant");
                if (role == null)
                {
                    return new BaseResponse<RestaurantResponse>
                    {
                        Message = "Role does not exist.",
                        IsSuccessful = false
                    };
                }

                existingRestaurant.Name = request.Name;
                existingRestaurant.Password = request.Password;
                existingRestaurant.DateOfEstablishment = DateTime.SpecifyKind(request.DateOfEstablishment, DateTimeKind.Utc);
                existingRestaurant.Location = request.Location;
                existingRestaurant.Food = request.Food;
                existingRestaurant.CAC = request.CAC;
                existingRestaurant.RoleId = role.Id;
                existingRestaurant.Role = role; // Update the role association
                existingRestaurant.ModifiedBy = loginUserId;
                existingRestaurant.IsDeleted = false;
                existingRestaurant.DateModified = DateTime.Now;

                _restaurantRepository.Update(existingRestaurant);
                await _unitOfWork.SaveAsync();

                return new BaseResponse<RestaurantResponse>
                {
                    Message = "Restaurant updated successfully.",
                    IsSuccessful = true,
                    Value = new RestaurantResponse
                    {
                        Id = existingRestaurant.Id,
                        Email = existingRestaurant.Email
                    }
                };
            }
            catch (Exception ex)
            {
                // Log exception details (using a proper logging framework is recommended)
                return new BaseResponse<RestaurantResponse>
                {
                    Message = $"An error occurred while updating the restaurant: {ex.Message}",
                    IsSuccessful = false
                };
            }
        }

    }
}
