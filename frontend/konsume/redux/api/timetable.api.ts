import { api } from "../api";

export const timetableApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMealPlans: builder.query({
      query: (userId) => `/MealPlan/GenMeal?userId=${userId}`,
    }),
  }),
});

export const { useGetMealPlansQuery } = timetableApi;
