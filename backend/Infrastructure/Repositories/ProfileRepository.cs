using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace KONSUME.Infrastructure.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly KonsumeContext _context;
        public ProfileRepository(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<Profile> AddAsync(Profile profile)
        {
            await _context.Set<Profile>()
                .AddAsync(profile);
            return await _context.Profiles
                .OrderByDescending(profile => profile.DateCreated)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> ExistsAsync(string email)
        {
            return await _context.Profiles.AnyAsync(x => x.User.Email == email);
        }

        public async Task<bool> ExistsAsync(string email, int id)
        {
            return await _context.Profiles.AnyAsync(x => x.User.Email == email && x.Id != id);
        }

        public Profile Update(Profile profile)
        {
            _context.Profiles.Update(profile);
            return profile;
        }

        public async Task<ICollection<Profile>> GetAllAsync()
        {
            var answer = await _context.Set<Profile>()
                            .ToListAsync();
            return answer;
        }

        public async Task<Profile> GetAsync(int id)
        {
            var answer = await _context.Set<Profile>()
                        .Where(a => !a.IsDeleted && a.Id == id)
                        .Include(a => a.User)
                        .SingleOrDefaultAsync();
            return answer;
        }
        public async Task<bool> GetProfileByUserIdAsync(int id)
        {
            return await _context.Set<Profile>()
                        .AnyAsync(a => !a.IsDeleted && a.UserId == id);
        }

        public async Task<int> GetProfileDetailsByUserIdAsync(int id)
        {
            var profileId = await _context.Set<Profile>()
                         .Where(a => !a.IsDeleted && a.UserId == id)
                         .Select(a => a.Id) // Select only the ProfileId
                         .SingleOrDefaultAsync();
            return profileId;
        }

        public async Task<Profile> GetAsync(Expression<Func<Profile, bool>> exp)
        {
            var answer = await _context.Set<Profile>()
                        .Where(a => !a.IsDeleted)
                        .SingleOrDefaultAsync(exp);
            return answer;
        }

        public void Remove(Profile answer)
        {
            answer.IsDeleted = true;
            _context.Set<Profile>()
                .Update(answer);
            _context.SaveChanges();
        }

        public async Task<Profile> GetAsync(string email)
        {
            var answer = await _context.Set<Profile>()
                        .Where(a => !a.IsDeleted && a.User.Email == email)
                        .SingleOrDefaultAsync();
            return answer;
        }


    }

}

