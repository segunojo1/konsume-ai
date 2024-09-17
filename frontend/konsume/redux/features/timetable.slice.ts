import type { MealDatatype, DailyMealsDatatype } from "@/@types/timetable";
import { createSlice } from "@reduxjs/toolkit";

interface InitialType {
  dailyMeals: DailyMealsDatatype[] | null;
  weeklyMeals: DailyMealsDatatype[] | null;
  meals: MealDatatype[] | null;
  loading: boolean;
  error: null | string;
}
const initialState: InitialType = {
  dailyMeals: null,
  weeklyMeals: null,
  meals: null,
  loading: false,
  error: null,
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    setTimetableLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTimetableError: (state, action) => {
      state.error = action.payload;
    },
    setDailyMeals: (state, action) => {
      state.dailyMeals = action.payload;
    },
    setMeals: (state, action) => {
      state.meals = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setDailyMeals,
  setMeals,
  setTimetableLoading,
  setTimetableError,
} = timetableSlice.actions;

export default timetableSlice.reducer;
