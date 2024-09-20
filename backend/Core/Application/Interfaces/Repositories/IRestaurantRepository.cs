using DaticianProj.Core.Domain.Entities;
using KONSUME.Core.Domain.Entities;
using System.Linq.Expressions;

namespace KONSUME.Core.Application.Interfaces.Repositories
{
    public interface IRestaurantRepository
    {
        Task<Restaurant> AddAsync(Restaurant user);
        Task<Restaurant> GetAsync(int id);
        Task<bool> ExistsAsync(int id);

        Task<Restaurant> GetAsync(string email);
        Task<Restaurant> GetAsync(Expression<Func<Restaurant, bool>> exp);
        Task<ICollection<Restaurant>> GetAllAsync();
        void Remove(Restaurant user);
        Restaurant Update(Restaurant user);
        Task<bool> ExistsAsync(string email, int id);
        Task<bool> ExistsAsync(string email);
    }
}
