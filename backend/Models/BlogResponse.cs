using System.Text.Json.Serialization;

namespace KONSUME.Models
{
    public class BlogResponse
    {
        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}

