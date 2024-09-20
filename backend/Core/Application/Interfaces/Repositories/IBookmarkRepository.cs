using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KONSUME.Core.Application.Interfaces.Repositories
{
    public interface IBookmarkRepository
    {
        Task<BaseResponse<Bookmark>> AddAsync(Bookmark bookmark);
        Task<BaseResponse<Bookmark>> GetByProfileIdAsync(int profileId);
        Task<BaseResponse<ICollection<Bookmark>>> GetAllByProfileIdAsync(int profileId);
        Task<BaseResponse<ICollection<Bookmark>>> GetAllAsync();
        Task<BaseResponse<Bookmark>> Update(Bookmark bookmark);
        Task<BaseResponse> Remove(Bookmark bookmark);
    }


}
