using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Google;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace KonsumeTestRun.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly KonsumeContext _context;
        public UserRepository(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Set<User>()
                .AddAsync(user);
            return await _context.Users.OrderByDescending(user => user.DateCreated).FirstOrDefaultAsync();
        }

        public async Task<bool> ExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email);
        }

        public async Task<bool> ExistsAsync(string email, int id)
        {
            return await _context.Users.AnyAsync(x => x.Email == email && x.Id != id);
        }

        public User Update(User entity)
        {
            _context.Users.Update(entity);
            return entity;
        }

        public async Task<ICollection<User>> GetAllAsync()
        {
            var answer = await _context.Set<User>()
                            .ToListAsync();
            return answer;
        }

        public async Task<User> GetAsync(string email)
        {
            var answer = await _context.Set<User>()
                        .Where(a => !a.IsDeleted && a.Email == email)
                        .SingleOrDefaultAsync();
            return answer;
        }

        public async Task<User> GetAsync(int id)
        {
            var answer = await _context.Set<User>()
                        .Where(a => !a.IsDeleted && a.Id == id)
                        .SingleOrDefaultAsync();
            return answer;
        }

        public async Task<User> GetAsync(Expression<Func<User, bool>> exp)
        {
            var answer = await _context.Set<User>()
                        .Where(a => !a.IsDeleted)
                        .SingleOrDefaultAsync(exp);
            return answer;
        }

        public void Remove(User answer)
        {
            answer.IsDeleted = true;
            _context.Set<User>()
                .Update(answer);
            _context.SaveChanges();
        }

        public async Task<string> GetUserToken(string token)
        {
            var user = await _context.Set<User>()
                        .Where(a => !a.IsDeleted && a.Token == token)
                        .SingleOrDefaultAsync();

            // If no user is found, return a default/fallback token value
            return user?.Token ?? throw new InvalidOperationException("User token must not be null.");
        }

    }

}
