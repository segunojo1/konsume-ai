using KONSUME.Core.Domain.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace KONSUME.Core.Domain.Entities
{
    public class Profile: Auditables
    {
        public Gender Gender { get; set; } = default!;
        public int Height { get; set; } = default!;
        public int Weight { get; set; } = default!;
        [Column(TypeName = "timestamp with time zone")]
        public DateTime DateOfBirth { get; set; }
        public string Nationality { get; set; } = default!;
        public string? BodyFat { get; set; } = default!;
        public string? DietType { get; set; } = default!;
        public string? SnackPreference {  get; set; } = default!;
        public string? NoOfMealPerDay {  get; set; } = default!;

        [NotMapped]
        public ICollection<string> Allergies
        {
            get => string.IsNullOrEmpty(AllergiesSerialized) ? new List<string>() : JsonSerializer.Deserialize<ICollection<string>>(AllergiesSerialized);
            set => AllergiesSerialized = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public ICollection<string> UserGoals
        {
            get => string.IsNullOrEmpty(GoalsSerialized) ? new List<string>() : JsonSerializer.Deserialize<ICollection<string>>(GoalsSerialized);
            set => GoalsSerialized = JsonSerializer.Serialize(value);
        }

        public string AllergiesSerialized { get; set; }
        public string GoalsSerialized { get; set; }
        public int UserId { get; set; }
        public virtual User User {  get; set; } = default!;
    }
}
