using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using DaticianProj.Core.Domain.Entities;

namespace KonsumeTestRun.Infrastructure.Repositories
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly KonsumeContext _context;
        public RestaurantRepository(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<Restaurant> AddAsync(Restaurant entity)
        {
            await _context.Set<Restaurant>()
                .AddAsync(entity);
            return await _context.Restaurants.OrderByDescending(user => user.DateCreated).FirstOrDefaultAsync();
        }

        public async Task<bool> ExistsAsync(string email)
        {
            return await _context.Restaurants.AnyAsync(x => x.Email == email);
        }
        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Restaurants.AnyAsync(x => x.Id == id);
        }

        public async Task<bool> ExistsAsync(string email, int id)
        {
            return await _context.Restaurants.AnyAsync(x => x.Email == email && x.Id != id);
        }

        public Restaurant Update(Restaurant entity)
        {
            _context.Restaurants.Update(entity);
            return entity;
        }

        public async Task<ICollection<Restaurant>> GetAllAsync()
        {
            var answer = await _context.Set<Restaurant>()
                            .ToListAsync();
            return answer;
        }

        public async Task<Restaurant> GetAsync(string email)
        {
            var answer = await _context.Set<Restaurant>()
                        .Where(a => !a.IsDeleted && a.Email == email)
                        .SingleOrDefaultAsync();
            return answer;
        }

        public async Task<Restaurant> GetAsync(int id)
        {
            var answer = await _context.Set<Restaurant>()
                        .Where(a => !a.IsDeleted && a.Id == id)
                        .SingleOrDefaultAsync();
            return answer;
        }

        public async Task<Restaurant> GetAsync(Expression<Func<Restaurant, bool>> exp)
        {
            var answer = await _context.Set<Restaurant>()
                        .Include(a => a.Food)
                        .Where(a => !a.IsDeleted)
                        .SingleOrDefaultAsync(exp);
            return answer;
        }

        public void Remove(Restaurant answer)
        {
            answer.IsDeleted = true;
            _context.Set<Restaurant>()
                .Update(answer);
            _context.SaveChanges();
        }
        
    }

}
