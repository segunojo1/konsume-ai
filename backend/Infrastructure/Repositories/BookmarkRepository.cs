using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using KONSUME.Models;
using Microsoft.EntityFrameworkCore;

public partial class BookmarkRepository : IBookmarkRepository
{
    private readonly KonsumeContext _context;

    public BookmarkRepository(KonsumeContext context)
    {
        _context = context;
    }

    public async Task<BaseResponse<Bookmark>> AddAsync(Bookmark bookmark)
    {
        try
        {
            await _context.Bookmarks.AddAsync(bookmark);
            await _context.SaveChangesAsync();
            return new BaseResponse<Bookmark>
            {
                IsSuccessful = true,
                Message = "Bookmark added successfully",
                Value = bookmark
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<Bookmark>
            {
                IsSuccessful = false,
                Message = $"Error adding bookmark: {ex.Message}"
            };
        }
    }

    public async Task<BaseResponse<Bookmark>> GetByProfileIdAsync(int profileId)
    {
        var bookmark = await _context.Bookmarks
            .Where(b => b.ProfileId == profileId && !b.IsDeleted)
            .FirstOrDefaultAsync();

        if (bookmark == null)
        {
            return new BaseResponse<Bookmark>
            {
                IsSuccessful = false,
                Message = "Bookmark not found"
            };
        }

        return new BaseResponse<Bookmark>
        {
            IsSuccessful = true,
            Message = "Bookmark found",
            Value = bookmark
        };
    }

    public async Task<BaseResponse<ICollection<Bookmark>>> GetAllByProfileIdAsync(int profileId)
    {
        var bookmarks = await _context.Bookmarks
            .Where(b => b.ProfileId == profileId && !b.IsDeleted)
            .ToListAsync();


        return new BaseResponse<ICollection<Bookmark>>
        {
            IsSuccessful = true,
            Message = bookmarks.Any() ? "Bookmarks retrieved successfully" : "No bookmarks found",
            Value = bookmarks
        };
    }

    public async Task<BaseResponse<ICollection<Bookmark>>> GetAllAsync()
    {
        var bookmarks = await _context.Bookmarks.ToListAsync();
        return new BaseResponse<ICollection<Bookmark>>
        {
            IsSuccessful = true,
            Message = bookmarks.Any() ? "All bookmarks retrieved" : "No bookmarks available",
            Value = bookmarks
        };
    }

    public async Task<BaseResponse<Bookmark>> Update(Bookmark bookmark)
    {
        try
        {
            _context.Bookmarks.Update(bookmark);
            await _context.SaveChangesAsync();

            return new BaseResponse<Bookmark>
            {
                IsSuccessful = true,
                Message = "Bookmark updated successfully",
                Value = bookmark
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse<Bookmark>
            {
                IsSuccessful = false,
                Message = $"Error updating bookmark: {ex.Message}"
            };
        }
    }

    public async Task<BaseResponse> Remove(Bookmark bookmark)
    {
        try
        {
            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return new BaseResponse
            {
                IsSuccessful = true,
                Message = "Bookmark removed successfully"
            };
        }
        catch (Exception ex)
        {
            return new BaseResponse
            {
                IsSuccessful = false,
                Message = $"Error removing bookmark: {ex.Message}"
            };
        }
    }

}
