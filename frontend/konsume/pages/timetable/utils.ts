import { colors, mealsInfoCardColors } from "../../helpers/timetable/data";

const getRandomColor = (excludeColor?: string) => {
  const filteredColors = excludeColor
    ? colors.filter((color) => color !== excludeColor)
    : colors;
  const randomIndex = Math.floor(Math.random() * filteredColors.length);
  return filteredColors[randomIndex];
};
export default getRandomColor

export const getColorsByMealType = (label?: string) => {
  const mealInfo = mealsInfoCardColors.find(
    ({ meal }) => meal?.toLowerCase() === label?.toLowerCase()
  );
  return mealInfo
    ? mealInfo
    : { primaryColor: "#FFFFFF", secondaryColor: "#FFFFFF" };
};
