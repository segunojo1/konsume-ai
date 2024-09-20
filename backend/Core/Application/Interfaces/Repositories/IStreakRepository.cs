using KONSUME.Core.Domain.Entities;

namespace KONSUME.Core.Application.Interfaces.Repositories
{
    public interface IStreakRepository
    {
        Task CreateStreakAsync(Streak streak);
        Task<Streak> GetStreakByProfileIdAsync(int profileId);
        Task UpdateStreakAsync(Streak streak);
    }


}
