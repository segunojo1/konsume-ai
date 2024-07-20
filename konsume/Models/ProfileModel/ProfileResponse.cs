using KONSUME.Core.Domain.Enum;

namespace KONSUME.Models.ProfileModel
{
    public class ProfileResponse
    {
        public int Id { get; set; }
        public Gender Gender { get; set; } = default!;
        public int Height { get; set; } = default!;
        public int Weight { get; set; } = default!;
        public int Age { get; set; } = default!;
        public DateTime DateOfBirth { get; set; }
        public string Nationality { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string? BodyFat { get; set; } = default!;
        public string? DietType { get; set; } = default!;
        public string? SnackPreference { get; set; } = default!;
        public string? NoOfMealPerDay { get; set; } = default!;
        public ICollection<string> Allergies { get; set; } = new HashSet<string>();
        public ICollection<string> UserGoals { get; set; } = new HashSet<string>();
    }
}
