using KONSUME.Core.Application.Interfaces.Repositories;
using KONSUME.Core.Application.Interfaces.Services;
using KONSUME.Core.Domain.Entities;
using KONSUME.Models;
using OpenAI_API.Chat;
using OpenAI_API;

public class MealPlanService : IMealPlanService
{
    private readonly ITimetableRepository _timetableRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly IConfiguration _configuration;

    public MealPlanService(ITimetableRepository timetableRepository, IProfileRepository profileRepository, IConfiguration configuration)
    {
        _timetableRepository = timetableRepository;
        _profileRepository = profileRepository;
        _configuration = configuration;
    }

    public async Task<BaseResponse<ICollection<MealPlanResponse>>> Generate30DayMealPlanAsync(int id)
    {
        try
        {
            // Retrieve user profile
            var userProfile = await _profileRepository.GetAsync(id);
            if (userProfile == null)
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "User profile not found."
                };
            }

            // Retrieve existing meal plans for the profile
            var mealPlanResponse = await RetrieveMealPlanAsync(id);

            if (mealPlanResponse.IsSuccessful && mealPlanResponse.Value.Any())
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = true,
                    Value = mealPlanResponse.Value,
                    Message = mealPlanResponse.Message
                };
            }

            // Generate new meal plans
            var apiKey = _configuration["OpenAI:ApiKey"];
            var prompt = GeneratePrompt(userProfile);
            var aiResponse = await GetAIResponse(apiKey, prompt);

            var formattedResponse = ParseMealPlan(aiResponse, id);

            // Save the generated meal plans to the database
            await SaveMealPlans(formattedResponse, id);

            return new BaseResponse<ICollection<MealPlanResponse>>
            {
                IsSuccessful = true,
                Value = formattedResponse,
                Message = "30-day meal plan generated successfully."
            };
        }
        catch (Exception ex)
        {
            // Log the exception details (consider using a logging framework)
            Console.WriteLine($"Error: {ex.Message}");
            Console.WriteLine($"StackTrace: {ex.StackTrace}");

            return new BaseResponse<ICollection<MealPlanResponse>>
            {
                IsSuccessful = false,
                Message = "An unexpected error occurred. Please try again later."
            };
        }
    }

    private string GeneratePrompt(Profile userProfile)
    {
        var allergies = userProfile.Allergies;
        var goals = userProfile.UserGoals;
        var diet = userProfile.DietType;
        var age = CalculateAge(userProfile.DateOfBirth);

        var goalsDescription = (goals != null && goals.Any()) ? string.Join(", ", goals) : "achieve my goals";
        var allergiesDescription = (allergies != null && allergies.Any()) ? string.Join(", ", allergies) : "no allergies";
        var ageDescription = (age != 0) ? age.ToString() : "of unspecified age";

        return $"I want to {goalsDescription} and I have {allergiesDescription}. Generate 30 {(userProfile?.Nationality ?? "various")} meals for breakfast, lunch, and dinner suitable for me, considering that I follow a {(diet ?? "general")} diet and I am {ageDescription} years old.";
    }

    private async Task<string> GetAIResponse(string apiKey, string prompt)
    {
        var openai = new OpenAIAPI(apiKey);
        var chatRequest = new ChatRequest
        {
            Model = "ft:gpt-4o-mini-2024-07-18:personal:foodieai:A6vEIdeM",
            Messages = new[]
            {
                new ChatMessage(ChatMessageRole.System, "FoodieAI is a food chatbot."),
                new ChatMessage(ChatMessageRole.User, prompt)
            }
        };

        var result = await openai.Chat.CreateChatCompletionAsync(chatRequest);
        return result.Choices.Count > 0 ? result.Choices[0].Message.Content : "No response from AI.";
    }

    private async Task SaveMealPlans(ICollection<MealPlanResponse> mealPlans, int profileId)
    {
        // Check if the mealPlans count is sufficient before proceeding
        if (mealPlans.Count <= 10)
        {
            Console.WriteLine("Not enough meal plans to save. Ensure meal generation logic provides a full 30-day meal plan.");
            await Generate30DayMealPlanAsync(profileId); 
        }

        foreach (var mealPlanResponse in mealPlans)
        {
            foreach (var meal in mealPlanResponse.meal)
            {
                var mealplan = new MealPlans
                {
                    date = mealPlanResponse.Date,
                    MealPlan = new MealPlan
                    {
                        ProfileId = profileId,
                        Label = meal.Label,
                        MealType = meal.MealType,
                        FoodName = meal.FoodName,
                        FoodDescription = meal.FoodDescription,
                        Tags = meal.Tags,
                        CookTime = meal.CookTime,
                        NutritionalInfo = meal.NutritionalInfo
                    }
                };
                await _timetableRepository.GenerateMealPlanAsync(mealplan);
            }
        }
    }


    private ICollection<MealPlanResponse> ParseMealPlan(string data, int id)
    {
        var days = data.Split(new[] { '?' }, StringSplitOptions.RemoveEmptyEntries);
        var mealPlanResponses = new List<MealPlanResponse>();

        foreach (var day in days)
        {
            var dayParts = day.Split(new[] { '=' }, StringSplitOptions.RemoveEmptyEntries);
            if (dayParts.Length < 2) continue; // Skip if dayParts doesn't have enough data

            var dayLabel = dayParts[0].Trim();
            var mealPlanResponse = new MealPlanResponse
            {
                Date = DateTime.Today.AddDays(int.Parse(dayLabel.Replace("Day", "")) - 1),
                meal = new List<MealPlan>()
            };

            for (int i = 1; i < dayParts.Length; i++)
            {
                var mealDetails = dayParts[i].Split(new[] { '=' }, StringSplitOptions.RemoveEmptyEntries);

                foreach (var mealDetail in mealDetails)
                {
                    var mealData = mealDetail.Split(new[] { '$' }, StringSplitOptions.RemoveEmptyEntries);

                    if (mealData.Length < 7) continue; // Skip if mealData doesn't have enough parts
                    var meal = new MealPlan()
                    {
                        Label = mealData[0].Trim(),
                        MealType = mealData[1].Trim(),
                        FoodName = mealData[2].Trim(),
                        FoodDescription = mealData[3].Trim(),
                        Tags = new List<string>(mealData[4].Trim().Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)),
                        CookTime = ParseCookTime(mealData[5]),
                        NutritionalInfo = ParseNutritionalInfo(mealData)
                    };
                    mealPlanResponse.meal.Add(meal);
                }
            }
            mealPlanResponses.Add(mealPlanResponse);
        }

        return mealPlanResponses;
    }
    // Helper method to parse CookTime with logging
    private int ParseCookTime(string cookTimeData)
    {
        if (int.TryParse(cookTimeData.Trim(), out int cookTime))
        {
            return cookTime;
        }
        else
        {
            Console.WriteLine($"Failed to parse CookTime: '{cookTimeData}'");
            return 0; // Default to 0 if parsing fails
        }
    }

    private static List<NutritionalInfo> ParseNutritionalInfo(string[] mealData)
    {
        var nutritionalInfo = new List<NutritionalInfo>();

        if (mealData.Length > 7)
        {
            // Parsing Calories
            var calorieInfo = mealData[6].Trim().Split(' ');
            if (calorieInfo.Length > 1 && int.TryParse(calorieInfo[0], out int calories))
            {
                nutritionalInfo.Add(new NutritionalInfo { Name = "Calories", Value = calories.ToString(), Unit = "kcal" });
            }

            // Parsing Protein
            var proteinInfo = mealData[7].Trim().Split('g');
            if (proteinInfo.Length > 0 && int.TryParse(proteinInfo[0].Trim(), out int protein))
            {
                nutritionalInfo.Add(new NutritionalInfo { Name = "Protein", Value = protein.ToString(), Unit = "g" });
            }

            // Parsing Carbohydrates
            var carbInfo = mealData[8].Trim().Split('g');
            if (carbInfo.Length > 0 && int.TryParse(carbInfo[0].Trim(), out int carbs))
            {
                nutritionalInfo.Add(new NutritionalInfo { Name = "Carbohydrate", Value = carbs.ToString(), Unit = "g" });
            }
        }

        return nutritionalInfo;
    }

    private int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;
        if (dateOfBirth.Date > today.AddYears(-age)) age--;
        return age;
    }

    public async Task<BaseResponse<ICollection<MealPlanResponse>>> RetrieveMealPlanAsync(int profileId)
    {
        try
        {
            Console.WriteLine($"Retrieving user profile for ID: {profileId}");
            var userProfile = await _profileRepository.GetAsync(profileId);
            if (userProfile == null)
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "User profile not found."
                };
            }

            Console.WriteLine("Retrieving existing meal plans.");
            var mealPlanEntities = await _timetableRepository.GetMealPlanByProfileIdAsync(profileId);
            if (mealPlanEntities == null || !mealPlanEntities.Any())
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "No meal plans found for the specified profile."
                };
            }

            Console.WriteLine("Transforming meal plans into response objects.");
            var existingMealPlans = mealPlanEntities
                .GroupBy(mp => mp.date)
                .Select(group => new MealPlanResponse
                {
                    Date = group.Key,
                    meal = group.Select(mp => new MealPlan
                    {
                        Label = mp.MealPlan?.Label ?? "Unknown",
                        MealType = mp.MealPlan?.MealType ?? "Unknown",
                        FoodName = mp.MealPlan?.FoodName ?? "Unknown",
                        FoodDescription = mp.MealPlan?.FoodDescription ?? "No Description",
                        Tags = mp.MealPlan?.Tags ?? new List<string>(),
                        CookTime = mp.MealPlan?.CookTime ?? 0,
                        NutritionalInfo = mp.MealPlan?.NutritionalInfo?.Select(n => new NutritionalInfo
                        {
                            Name = n.Name ?? "Unknown",
                            Value = n.Value ?? "0",
                            Unit = n.Unit ?? "Unknown"
                        }).ToList() ?? new List<NutritionalInfo>()
                    }).ToList()
                }).ToList();

            Console.WriteLine("Checking the date of the last meal plan.");
            if (existingMealPlans.Any())
            {
                var lastMealPlanDate = existingMealPlans
                    .Select(mp => (DateTime?)mp.Date)
                    .Max() ?? DateTime.MinValue;

                if (DateTime.Now - lastMealPlanDate <= TimeSpan.FromDays(30))
                {
                    return new BaseResponse<ICollection<MealPlanResponse>>
                    {
                        IsSuccessful = true,
                        Value = existingMealPlans,
                        Message = "Returning existing meal plan from the last 30 days."
                    };
                }
                else
                {
                    return new BaseResponse<ICollection<MealPlanResponse>>
                    {
                        IsSuccessful = false,
                        Message = "Existing meal plan is older than 30 days. Please generate a new one."
                    };
                }
            }
            else
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "No meal plans found for the specified profile."
                };
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            Console.WriteLine($"StackTrace: {ex.StackTrace}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                Console.WriteLine($"Inner StackTrace: {ex.InnerException.StackTrace}");
            }

            return new BaseResponse<ICollection<MealPlanResponse>>
            {
                IsSuccessful = false,
                Message = "An unexpected error occurred. Please try again later."
            };
        }
    }



    public async Task<BaseResponse<ICollection<MealPlanResponse>>> UpdateMealPlans(MealPlans mealPlan, int profileId)
    {
        try
        {
            // Get the MealPlans for the specified date
            var existingMealPlans = await _timetableRepository.GetMealPlanByProfileIdAsync(profileId);
            var mealPlansForDate = existingMealPlans.FirstOrDefault(mp => mp.date.Date == mealPlan.date.Date);

            if (mealPlansForDate == null)
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "Meal plan for the specified date not found."
                };
            }

            // Assuming 'mealPlan.MealPlan' holds the meal to be updated.
            var mealToUpdate = mealPlansForDate.MealPlan;

            if (mealToUpdate == null || mealToUpdate.Id != mealPlan.Id)
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "Specified meal not found."
                };
            }

            // Update the meal's properties
            mealToUpdate.Label = mealPlan.MealPlan.Label;
            mealToUpdate.MealType = mealPlan.MealPlan.MealType;
            mealToUpdate.FoodName = mealPlan.MealPlan.FoodName;
            mealToUpdate.FoodDescription = mealPlan.MealPlan.FoodDescription;
            mealToUpdate.Tags = mealPlan.MealPlan.Tags;
            mealToUpdate.CookTime = mealPlan.MealPlan.CookTime;
            mealToUpdate.NutritionalInfo = mealPlan.MealPlan.NutritionalInfo;

            // Save changes to the database
            var updateResult = await _timetableRepository.UpdateMealPlans(mealPlansForDate);
            if (!updateResult)
            {
                return new BaseResponse<ICollection<MealPlanResponse>>
                {
                    IsSuccessful = false,
                    Message = "Failed to update the meal plans."
                };
            }

            // Create a MealPlanResponse object to reflect the updated meal
            var response = new MealPlanResponse
            {
                Date = mealPlansForDate.date,
                meal = new List<MealPlan> { mealToUpdate }
            };

            return new BaseResponse<ICollection<MealPlanResponse>>
            {
                IsSuccessful = true,
                Value = new List<MealPlanResponse> { response },
                Message = "Meal plan updated successfully."
            };
        }
        catch (Exception ex)
        {
            // Log exception details
            Console.WriteLine($"Exception: {ex.Message}");

            return new BaseResponse<ICollection<MealPlanResponse>>
            {
                IsSuccessful = false,
                Message = "An unexpected error occurred while updating the meal plans."
            };
        }
    }



}
