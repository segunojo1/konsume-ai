using KONSUME.Core.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace KONSUME.Models.ProfileModel
{
    public class ProfileRequest
    {

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [RegularExpression("Male|Female", ErrorMessage = "Gender must be Male or Female.")]
        public string Gender { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Height must be greater than 0.")]
        public int Height { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Weight must be greater than 0.")]

        public int Weight { get; set; }
        [Required]
        public string Nationality { get; set; } = default!;
        public string? DietType { get; set; } = default!;
        public ICollection<string> Allergies { get; set; } = new HashSet<string>();
        public ICollection<string> UserGoals { get; set; } = new HashSet<string>();
    }
    public class RestaurantRequest
    {

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfEstablishment { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public List<string> Food { get; set; }
        [Required]
        public string CAC { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }    
    }
}
