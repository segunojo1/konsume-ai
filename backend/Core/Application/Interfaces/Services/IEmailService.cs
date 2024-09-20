using DaticianProj.Core.Domain.Entities;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;

namespace KONSUME.Core.Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendEmailClient(string msg, string title, string email);
        Task<BaseResponse> SendNotificationToUserAsync(Profile profile);
        Task<bool> SendEmailAsync(MailRecieverDto model, MailRequests request);
        Task<BaseResponse> SendProfileUpdateNotificationAsync(Profile profile);
        Task<BaseResponse> SendNotificationToRestaurantAsync(Restaurant restaurant);
    }

}
