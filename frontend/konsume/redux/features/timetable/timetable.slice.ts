import { MealDatatype, DailyMealsDatatype } from "@/@types/timetable";
import { dailyMealsData } from "@/pages/timetable/data";
import { createSlice } from "@reduxjs/toolkit";

interface InitialType {
  dailyMeals: DailyMealsDatatype[] | null;
  weeklyMeals: DailyMealsDatatype[] | null;
  meals: MealDatatype[] | null;
}
const initialState: InitialType = {
  dailyMeals: dailyMealsData,
  weeklyMeals: null,
  meals: null,
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    setDailyMeals: (state, action) => {
      state.dailyMeals = action.payload;
    },
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
  },
});

export const { setDailyMeals, setMeals } = timetableSlice.actions;

export default timetableSlice.reducer;
