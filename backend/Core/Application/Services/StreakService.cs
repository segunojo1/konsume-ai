using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;

public class StreakService : IStreakService
{
    private readonly IStreakRepository _streakRepository;
    IProfileRepository _profileRepository;

    public StreakService(IStreakRepository streakRepository, IProfileRepository profileRepository)
    {
        _streakRepository = streakRepository;
        _profileRepository = profileRepository; 
    }


    public async Task<int> GetStreakCountByProfileIdAsync(int profileId)
    {
        // Fetch the streak from the repository by profile ID
        var streak = await _streakRepository.GetStreakByProfileIdAsync(profileId);
        
        // Return the streak count; if no streak is found, return 0
        return streak?.StreakCount ?? 0;
    }



    public async Task<Streak> UpdateReadingStreakAsync(int profileId)
    {
        var profile = await _profileRepository.GetAsync(profileId);
        if (profile == null)
        {
            return new Streak
            {
                ProfileId = profileId,
                IsSuccessful = false,
                Message = "Profile not found.",
                StreakCount = 0
            };
        }

        // Retrieve or create the streak
        var streak = await _streakRepository.GetStreakByProfileIdAsync(profileId);
        var currentTimestamp = DateTime.Now;

        if (streak == null)
        {
            // Create a new streak if none exists
            streak = new Streak
            {
                ProfileId = profileId,
                StreakCount = 1,
                DateCreated = currentTimestamp,
                DateModified = currentTimestamp,
                IsSuccessful = true,
                Message = "New streak created.",
                IsDeleted = false
            };

            await _streakRepository.CreateStreakAsync(streak);
            return streak;
        }

        var lastReadDate = streak.DateModified;

        // If lastReadDate is null, it indicates the first read
        if (lastReadDate == null)
        {
            streak.StreakCount = 1;
        }
        else
        {
            // Get the current and last read dates, ignoring the time portion
            var currentDate = currentTimestamp.Date;
            var lastReadDateOnly = lastReadDate.Value.Date;

            if (currentDate > lastReadDateOnly)
            {
                // If the current date is after the last read date, increment the streak
                streak.StreakCount += 1;
            }
            else
            {
                // If already updated today, do not modify the streak count
                streak.Message = "Reading streak already updated for today.";
                streak.IsSuccessful = true;
                return streak;
            }
        }

        // Update the streak record with the new timestamp and count
        streak.DateModified = currentTimestamp;
        streak.IsSuccessful = true;
        streak.Message = "Reading streak updated successfully.";
        streak.IsDeleted = false;
        streak.ProfileId = profileId;

        await _streakRepository.UpdateStreakAsync(streak);

        return streak;
    }

    

}
