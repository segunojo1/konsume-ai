using KONSUME.Core.Domain.Entities;
using KONSUME.Models.Entities;
using System.Text.Json.Serialization;

namespace DaticianProj.Core.Domain.Entities
{
    public class Restaurant: Auditables
    {
        [JsonInclude]
        public string Name { get; set; }
        [JsonInclude]
        public string Email { get; set; }
        [JsonInclude]
        public string Password { get; set; }
        
        public DateTime DateOfEstablishment { get; set; }
        [JsonInclude]
        public string Location { get; set; }
        [JsonInclude]
        public List<string> Food { get; set; }
        [JsonInclude]
        public string CAC { get; set; }
        public int RoleId { get; set; }
        [JsonInclude]
        public Role Role { get; set; }
    }
}
