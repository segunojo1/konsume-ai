import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { MealsInfoCard } from "./meals-info-card";

type Props = {
  date: string;
};

export const WeekContent = ({ date }: Props) => {
  const { dailyMeals } = useAppSelector((state) => state.timetable);

  return (
    <div className="flex justify-between divide-x-[1px] divide-[#D1C9F7]">
      {dailyMeals
        ? dailyMeals
            .filter((day) => day.date === date)
            .map((meal, index) => (
              <MealsInfoCard key={index} data={lunchData} />
            ))
        : null}
    </div>
  );
};
