namespace KONSUME.Core.Domain.Entities
{
    public class MealRecommendation
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public string DateSeed { get; set; } // Unique identifier for the day
        public string Meals { get; set; } // JSON or text representation of meals
    }


}


