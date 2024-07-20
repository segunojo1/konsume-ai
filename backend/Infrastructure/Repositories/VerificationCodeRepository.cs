using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using KONSUME.Models.Entities;
using System.Linq.Expressions;

namespace KONSUME.Infrastructure.Repositories
{
    public class VerificationCodeRepository : IVerificationCodeRepository
    {
        protected KonsumeContext _context;

        public VerificationCodeRepository(KonsumeContext context) =>
                    _context = context;
        public async Task< VerificationCode> Create(VerificationCode entity)
        {
           await _context.Set<VerificationCode>().AddAsync(entity);
            return entity;
        }

        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }

        public VerificationCode Update(VerificationCode entity)
        {
            _context.Set<VerificationCode>().Update(entity);
            return entity;
        }
        public async Task<VerificationCode> Get(string email)
        {
            return await _context.VerificationCodes
                 .Include(a => a.User)
            .Where(a => !a.IsDeleted)
            .SingleOrDefaultAsync(a => a.User.Email == email);
        }

        public async Task<VerificationCode> Get(int id)
        {
            return await _context.VerificationCodes
                 .Include(a => a.User)
            .Where(a => !a.IsDeleted)
            .SingleOrDefaultAsync(a => a.Id == id);
        }

        
        public async Task<VerificationCode> Get(Expression<Func<VerificationCode, bool>> expression)
        {
            return await _context.VerificationCodes
                 .Include(a => a.User)
            .Where(a => !a.IsDeleted)
            .SingleOrDefaultAsync(expression);
        }
    }
}
