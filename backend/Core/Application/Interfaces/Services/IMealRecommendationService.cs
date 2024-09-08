namespace KONSUME.Core.Application.Interfaces.Services
{
    public interface IMealRecommendationService
    {
        Task SaveDailyRecommendationsAsync(int profileId, string dateSeed, string meals);
        Task<string> GetDailyRecommendationsAsync(int profileId, string dateSeed);
    }

}
