using KONSUME.Core.Domain.Entities;
using KONSUME.Models;

namespace KONSUME.Core.Application.Interfaces.Services
{
    public interface IUserInteractionService
    {
        Task<UserInteraction> SaveUserInteractionAsync(string question, string response);
        Task<List<UserInteraction>> GetUserInteractionsAsync();
    }

}

