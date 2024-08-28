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

        public async Task<UserInteraction> SaveUserInteractionAsync(int userId, string question, string response)
        {
            var interaction = new UserInteraction
            {
                UserId = userId, // Save the user ID here
                Question = question,
                Response = response,
                DateCreated = DateTime.UtcNow,
                IsDeleted = false,
            };

            _context.UserInteractions.Add(interaction);
            await _context.SaveChangesAsync();
            return interaction;
        }

        public async Task<List<UserInteraction>> GetUserInteractionsAsync(int id)
        {
            return await _context.UserInteractions
                .Where(x => x.UserId == id)
                .Include(ui => ui.User)
                .ThenInclude(ui => ui.Profile)
                .OrderByDescending(x => x.DateCreated)
                .ToListAsync();
        }

    }
}

