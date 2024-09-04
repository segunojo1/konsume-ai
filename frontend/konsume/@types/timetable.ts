export interface NutritionalInfoItem {
  name: string;
  value: string;
  unit: string;
}
export interface MealDatatype {
  mealType: string;
  foodName: string;
  foodDescription: string;
  tags: string[];
  cookTime: number;
  caloriesPerServing: number;
  nutritionalInfo: NutritionalInfoItem[];
  label?: string;
}
export interface DailyMealsDatatype {
  date: string;
  meals: {
    mealType: string;
    foodName: string;
    foodDescription: string;
    tags: string[];
    cookTime: number;
    caloriesPerServing: number;
    nutritionalInfo: NutritionalInfoItem[];
    label?: string;
  }[];
}

export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
