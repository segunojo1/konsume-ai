using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Infrastructure.Context;

namespace KonsumeTestRun.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly KonsumeContext _context;

        public UnitOfWork(KonsumeContext context)
        {
            _context = context;
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
