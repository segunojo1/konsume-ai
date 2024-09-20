using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using KonsumeTestRun.Core.Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Xml.Linq;

namespace KonsumeTestRun.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly KonsumeContext _context;
        public RoleRepository(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<Role> AddAsync(Role role)
        {
            await _context.Set<Role>()
                          .AddAsync(role);
            return role;
        }

        public async Task<bool> ExistAsync(string name)
        {
            return await _context.Roles.AnyAsync(a => a.Name == name);
        }

        public async Task<bool> ExistAsync(string name, int id)
        {
            return await _context.Roles.AnyAsync(a => a.Name == name && a.Id != id);
        }

        public async Task<ICollection<Role>> GetAllAsync()
        {
            var answer = await _context.Set<Role>()
                        .Include(c => c.Users)
                        .ToListAsync();
            return answer;
        }

        

        public async Task<Role> GetAsync(int id)
        {
            var answer = await _context.Set<Role>()
                        .Include(c => c.Users)
                        .Where(a => a.Id == id)
                        .SingleOrDefaultAsync();
            return answer;
        }

        public async Task<Role> GetAsync(Expression<Func<Role, bool>> exp)
        {
            var answer = await _context.Set<Role>()
                        .Include(c => c.Users)
                        .SingleOrDefaultAsync(exp);
            return answer;
        }

        public void Remove(Role answer)
        {
            answer.IsDeleted = true;
            _context.Set<Role>()
                .Update(answer);
            _context.SaveChanges();
        }

        public Role Update(Role entity)
        {
            var role = _context.Roles.Update(entity);
            return entity;
        }

    }
}
