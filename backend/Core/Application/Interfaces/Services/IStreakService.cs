using KONSUME.Core.Domain.Entities;

public interface IStreakService
{
    Task<Streak> UpdateReadingStreakAsync(int profileId);
    Task<int> GetStreakCountByProfileIdAsync(int profileId);
}