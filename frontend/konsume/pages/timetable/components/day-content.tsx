import React from "react";
import Image from "next/image";
import type { MealDatatype } from "@/@types/timetable";
import { useAppSelector } from "@/redux/hooks";
import MealsInfoCard from "./meals-info-card";

const DayContent = () => {
  const { meals } = useAppSelector((state) => state.timetable);

  const filterMealsDataByLabel = (
    label: string
  ): MealDatatype | undefined | null => {
    return meals
      ? meals.find((meal) => meal.label?.toLowerCase() === label?.toLowerCase())
      : null;
  };

  const breakfastData = filterMealsDataByLabel("breakfast");
  const lunchData = filterMealsDataByLabel("lunch");
  const dinnerData = filterMealsDataByLabel("dinner");

  return (
    <div className="flex justify-between lg:flex-row flex-col">
      <div className="flex flex-col items-center space-y-11">
        {breakfastData ? <MealsInfoCard data={breakfastData} /> : null}
        <Image
          src="/breakfast-icon-image.png"
          alt=""
          width={212}
          height={240}
        className="lg:block hidden"/>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <Image src="/lunch-icon-image.png" alt="" width={212} height={212} className="lg:block hidden"/>{" "}
        {lunchData ? <MealsInfoCard data={lunchData} /> : null}
      </div>
      <div className="flex flex-col items-center space-y-11">
        {dinnerData ? <MealsInfoCard data={dinnerData} /> : null}
        <Image src="/dinner-icon-image.png" alt="" width={212} height={212} className="lg:block hidden"/>
      </div>
    </div>
  );
};
export default DayContent;
