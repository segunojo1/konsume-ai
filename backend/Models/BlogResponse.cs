using System.Text.Json.Serialization;

namespace YourNamespace.Models.AIModels
{
    public class BlogResponse
    {
        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}

