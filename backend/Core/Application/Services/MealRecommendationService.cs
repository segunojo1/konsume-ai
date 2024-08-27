using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace KONSUME.Core.Application.Services
{
    public class MealRecommendationService : IMealRecommendationService
    {
        private readonly KonsumeContext _dbContext;

        public MealRecommendationService(KonsumeContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveDailyRecommendationsAsync(int profileId, string dateSeed, string meals)
        {
            // Check if recommendations already exist for this day
            var existingRecommendation = await _dbContext.MealRecommendations
                .FirstOrDefaultAsync(mr => mr.ProfileId == profileId && mr.DateSeed == dateSeed);

            if (existingRecommendation != null)
            {
                // Update existing recommendation
                existingRecommendation.Meals = meals;
                _dbContext.MealRecommendations.Update(existingRecommendation);
            }
            else
            {
                // Create new recommendation
                var newRecommendation = new MealRecommendation
                {
                    ProfileId = profileId,
                    DateSeed = dateSeed,
                    Meals = meals
                };
                await _dbContext.MealRecommendations.AddAsync(newRecommendation);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task<string> GetDailyRecommendationsAsync(int profileId, string dateSeed)
        {
            var recommendation = await _dbContext.MealRecommendations
                .FirstOrDefaultAsync(mr => mr.ProfileId == profileId && mr.DateSeed == dateSeed);

            return recommendation?.Meals;
        }
    }


}
