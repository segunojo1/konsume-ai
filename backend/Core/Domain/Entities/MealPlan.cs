namespace KONSUME.Core.Domain.Entities
{
    public class MealPlans : Auditables
    {
        public DateTime date { get; set; }
        public MealPlan MealPlan { get; set; }
    }

    public class MealPlan
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public string Label { get; set; }
        public string MealType { get; set; }
        public string FoodName { get; set; }
        public string FoodDescription { get; set; }
        public List<string> Tags { get; set; }
        public int CookTime { get; set; }
        public List<NutritionalInfo> NutritionalInfo { get; set; }
    }
    public class DayMeal
    {
        public DateTime Date { get; set; }
        public List<MealPlan> Meals { get; set; }
    }
    public class NutritionalInfo
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Unit { get; set; }

        public string Format()
        {
            return $"{Name}: {Value} {Unit}";
        }
    }
}
