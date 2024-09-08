import {
  MealDatatype,
  DailyMealsDatatype,
  NutritionalInfoItem,
} from "@/@types/timetable";

export const nutritionalInfo: NutritionalInfoItem[] = [
  {
    name: "Calories",
    value: "200",
    unit: "kcal",
  },
  {
    name: "Protein",
    value: "10",
    unit: "g",
  },
  {
    name: "Carbohydrate",
    value: "50",
    unit: "g",
  },
  {
    name: "Healthy Fats",
    value: "10",
    unit: "g",
  },
];

export const dailyMealsData: DailyMealsDatatype[] = [
  {
    date: "04/09/24",
    meals: [
      {
        label: "breakfast",
        mealType: "Breakfast",
        foodName: "Moi-moi",
        foodDescription: "Nutritious bean cake high in protein and fiber.",
        tags: ["Healthy", "Vegetarian", "High Protein", "Local Cuisine"],
        cookTime: 30,
        caloriesPerServing: 500,
        nutritionalInfo: [
          { name: "Calories", value: "200", unit: "kcal" },
          { name: "Protein", value: "10", unit: "g" },
          { name: "Carbohydrate", value: "50", unit: "g" },
        ],
      },
      {
        label: "lunch",
        mealType: "Lunch",
        foodName: "Jollof Rice and Chicken",
        foodDescription:
          "A classic Nigerian dish rich in flavor and essential nutrients.",
        tags: ["Healthy", "High Protein", "Local Cuisine"],
        cookTime: 40,
        caloriesPerServing: 700,
        nutritionalInfo: [
          { name: "Calories", value: "300", unit: "kcal" },
          { name: "Protein", value: "15", unit: "g" },
          { name: "Carbohydrate", value: "70", unit: "g" },
        ],
      },
      {
        label: "dinner",
        mealType: "Dinner",
        foodName: "Egusi Soup with Pounded Yam",
        foodDescription:
          "A traditional dish perfect for muscle building and weight management.",
        tags: ["Healthy", "High Protein", "Local Cuisine"],
        cookTime: 50,
        caloriesPerServing: 800,
        nutritionalInfo: [
          { name: "Calories", value: "400", unit: "kcal" },
          { name: "Protein", value: "20", unit: "g" },
          { name: "Carbohydrate", value: "80", unit: "g" },
        ],
      },
    ],
  },
  {
    date: "05/09/24",
    meals: [
      {
        label: "breakfast",
        mealType: "Breakfast",
        foodName: "Pancakes",
        foodDescription: "Fluffy pancakes with syrup.",
        tags: ["Sweet", "Vegetarian"],
        cookTime: 20,
        caloriesPerServing: 300,
        nutritionalInfo: [
          { name: "Calories", value: "300", unit: "kcal" },
          { name: "Protein", value: "8", unit: "g" },
          { name: "Carbohydrate", value: "40", unit: "g" },
        ],
      },
      {
        label: "lunch",
        mealType: "Lunch",
        foodName: "Pancakes",
        foodDescription: "Fluffy pancakes with syrup.",
        tags: ["Sweet", "Vegetarian"],
        cookTime: 20,
        caloriesPerServing: 300,
        nutritionalInfo: [
          { name: "Calories", value: "300", unit: "kcal" },
          { name: "Protein", value: "8", unit: "g" },
          { name: "Carbohydrate", value: "40", unit: "g" },
        ],
      },
      {
        label: "dinner",
        mealType: "Dinner",
        foodName: "Pancakes",
        foodDescription: "Fluffy pancakes with syrup.",
        tags: ["Sweet", "Vegetarian"],
        cookTime: 20,
        caloriesPerServing: 300,
        nutritionalInfo: [
          { name: "Calories", value: "300", unit: "kcal" },
          { name: "Protein", value: "8", unit: "g" },
          { name: "Carbohydrate", value: "40", unit: "g" },
        ],
      },
    ],
  },
];



export const mealsInfoCardColors = [
  { meal: "breakfast", primaryColor: "#FFFFFF", secondaryColor: "#EDFAE7" },
  { meal: "lunch", primaryColor: "#D6FBC4", secondaryColor: "#FFFFFF" },
  { meal: "dinner", primaryColor: "#EDFAE7", secondaryColor: "#FFFFFF" },
];

export const colors = ["#D6FBC4", "#D3D3D3", "#FFFFFF", "#EDFAE7"];
