using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Domain.Entities;
using KONSUME.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class TimetableRepository : ITimetableRepository
{
    private readonly KonsumeContext _context;

    public TimetableRepository(KonsumeContext context)
    {
        _context = context;
    }


    public async Task<ICollection<MealPlans>> GenerateMealPlanAsync(MealPlans mealPlan)
    {
        // Check if context is disposed before performing operations
        if (_context == null) throw new ObjectDisposedException(nameof(KonsumeContext));

        await _context.Set<MealPlans>().AddAsync(mealPlan);
        await _context.SaveChangesAsync(); // Ensure changes are saved

        return new List<MealPlans> { mealPlan }; // Returning as collection
    }

    public async Task<ICollection<MealPlans>> GetMealPlanByProfileIdAsync(int profileId)
    {
        // Retrieves a meal plan for a profile ID
        return await _context.MealPlans
        .Include(mp => mp.MealPlan)
            .ThenInclude(mp => mp.NutritionalInfo) // Ensure NutritionalInfo is included
        .Where(mp => mp.MealPlan.ProfileId == profileId)
        .ToListAsync();
    }


    public async Task<MealPlans> GetMealPlansByIdAsync(int mealId)
    {
        // Retrieves a meal plan for a given meal ID
        return await _context.MealPlans
            .Include(mp => mp.MealPlan)
                .ThenInclude(mp => mp.NutritionalInfo) // Ensure NutritionalInfo is included
            .FirstOrDefaultAsync(mp => mp.MealPlan.Id == mealId);
    }
    public async Task<MealPlan> GetMealPlanByIdAsync(int mealId)
    {
        // Retrieves a specific MealPlan for a given meal ID
        return await _context.MealPlans
            .Where(mp => mp.MealPlan.Id == mealId)
            .Select(mp => mp.MealPlan)
            .Include(mp => mp.NutritionalInfo) // Ensure NutritionalInfo is included
            .FirstOrDefaultAsync();
    }


    public async Task<bool> UpdateMealPlan(MealPlans mealplan)
    {
        _context.MealPlans.Update(mealplan);
        var result =  await _context.SaveChangesAsync();
        return result > 0;
    }
     public  async Task<bool> UpdateMealPlans(MealPlans mealplan)
     {
         _context.MealPlans.Update(mealplan);
        var result = await _context.SaveChangesAsync();
        return result > 0;
     }
}

