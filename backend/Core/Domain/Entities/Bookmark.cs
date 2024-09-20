namespace KONSUME.Core.Domain.Entities
{
    public class Bookmark : Auditables
    {
        public int ProfileId { get; set; }

        public string? Title { get; set; }
        public string? Message { get; set; }
        public string? Category { get; set; }

        public string? Url { get; set; }
    }

}
