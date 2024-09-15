import { number } from "zod";

export interface NutritionalInfoItem {
  $id: string;
  $values: {
    $id: string;
    id: number;
    name: string;
    value: string;
    unit: string;
  }[];
}
export interface MealDatatype {
  $id: string;
  mealType: string;
  foodName: string;
  foodDescription: string;
  tags: {
    $id: string;
    $values: string[];
  };
  cookTime: number;
  caloriesPerServing: number;
  nutritionalInfo: NutritionalInfoItem;
  label?: string;
}
export interface DailyMealsDatatype {
  $id: string;
  date: string;
  meal: {
    $id: string;
    $values: {
      $id: string;
      mealType: string;
      foodName: string;
      foodDescription: string;
      tags: {
        $id: string;
        $values: string[];
      };
      cookTime: number;
      caloriesPerServing: number;
      nutritionalInfo: NutritionalInfoItem;
      label?: string;
    }[];
  };
}

export type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};
