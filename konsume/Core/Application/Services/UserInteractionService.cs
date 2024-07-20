using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;


namespace KONSUME.Core.Application.Services
{

    public class UserInteractionService : IUserInteractionService
    {
        private readonly KonsumeContext _context;

        public UserInteractionService(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<UserInteraction> SaveUserInteractionAsync(string question, string response)
        {
            var interaction = new UserInteraction
            {
                Question = question,
                Response = response,
                DateCreated = DateTime.UtcNow,
                IsDeleted = false,
            };

            _context.UserInteractions.Add(interaction);
            await _context.SaveChangesAsync();
            return interaction;
        }

        public async Task<List<UserInteraction>> GetUserInteractionsAsync()
        {
            return await _context.UserInteractions.OrderByDescending(ui => ui.DateCreated).ToListAsync();
        }
    }
}

