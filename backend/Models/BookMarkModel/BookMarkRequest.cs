using System.ComponentModel.DataAnnotations;

namespace DaticianProj.Models.BookMarkModel
{
    public class BookMarkRequest
    {
        public int ProfileId { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string? Message { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string? Title { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string? Category { get; set; }

        [Required(ErrorMessage = "Url is required")]
        public string? Url { get; set; }
    }


    public class BookMarkResponse
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public string? Message { get; set; }
        public string? Title { get; set; }
        public string? Category { get; set; }
        public string? Url { get; set; }
    }
}
