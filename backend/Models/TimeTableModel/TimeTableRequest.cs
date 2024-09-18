using KONSUME.Core.Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;

namespace KONSUME.Models
{
    public class MealPlanResponse
    {
        public DateTime Date { get; set; }
        public List<MealPlan> meal { get; set; }


    }
}
