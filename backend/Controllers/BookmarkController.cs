using DaticianProj.Models.BookMarkModel;
using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KONSUME.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookmarkController : ControllerBase
    {
        private readonly IBookmarkRepository _bookmarkRepository;

        public BookmarkController(IBookmarkRepository bookmarkRepository)
        {
            _bookmarkRepository = bookmarkRepository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateBookmark([FromBody] BookMarkRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var bookmark = new Bookmark
                {
                    ProfileId = request.ProfileId,
                    Title = request.Title,
                    Url = request.Url,
                    Category = request.Category,
                    Message = request.Message,
                    IsDeleted = false,
                    DateCreated = DateTime.UtcNow
                };

                var result = await _bookmarkRepository.AddAsync(bookmark);

                var response = new BookMarkResponse
                {
                    Id = result.Value.Id,
                    ProfileId = result.Value.ProfileId,
                    Message = result.Value.Message,
                    Category = result.Value.Category,
                    Title = result.Value.Title,
                    Url = result.Value.Url
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                // Log the exception (optional)
                return StatusCode(500, new { error = "An unexpected error occurred. Please try again later." });
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookmark([FromBody] BookMarkRequest request)
        {
            try
            {
                var existingBookmark = await _bookmarkRepository.GetByProfileIdAsync(request.ProfileId);

                if (existingBookmark == null)
                    return NotFound(new { error = "Bookmark not found." });

                // Update values
                existingBookmark.Value.Title = request.Title;
                existingBookmark.Value.Message = request.Message;
                existingBookmark.Value.Category = request.Category;
                existingBookmark.Value.Url = request.Url;
                existingBookmark.Value.DateModified = DateTime.UtcNow;

                var updatedBookmark = _bookmarkRepository.Update(existingBookmark.Value);

                var response = new BookMarkResponse
                {
                    Id = updatedBookmark.Id,
                    ProfileId = updatedBookmark.Result.Value.ProfileId,
                    Message = updatedBookmark.Result.Value.Message,
                    Url = updatedBookmark.Result.Value.Url,
                    Category = updatedBookmark.Result.Value.Category,
                    Title = updatedBookmark.Result.Value.Title,
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                // Log exception if needed
                return StatusCode(500, new { error = "An unexpected error occurred. Please try again later." });
            }
        }


        [HttpGet("{profileId}")]
        public async Task<IActionResult> GetBookmarksByProfileId(int profileId)
        {
            var bookmarks = await _bookmarkRepository.GetAllByProfileIdAsync(profileId);
            return Ok(bookmarks);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBookmark(int id)
        {
            var bookmark = _bookmarkRepository.GetByProfileIdAsync(id).Result;
            if (bookmark == null) return NotFound();

            _bookmarkRepository.Remove(bookmark.Value);
            return NoContent();
        }
    }
}
