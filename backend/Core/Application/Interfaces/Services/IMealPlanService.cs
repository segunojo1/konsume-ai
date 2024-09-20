using System.Collections.Generic;
using System.Threading.Tasks;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;

namespace KONSUME.Core.Application.Interfaces.Services
{
    public interface IMealPlanService
    {
        Task<BaseResponse<ICollection<MealPlanResponse>>> Generate30DayMealPlanAsync(int id);
        Task<BaseResponse<ICollection<MealPlanResponse>>> RetrieveMealPlanAsync(int profileId);
        Task <BaseResponse<ICollection<MealPlanResponse>>> UpdateMealPlans(MealPlans mealplan,int profileid);
        // Task <BaseResponse<ICollection<MealPlanResponse>>> UpdateMealPlan(MealPlan mealplan,int profileid,int mealId);
    }
}

