import React from "react";
import Image from "next/image";
import progress1 from "../../../public/progress1.svg";
import streaks from "../../../public/streak.svg"
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";

const DashboardProgressTracker: React.FC = () => {
  const {streakCount} = useUserContext();
  return (
    <div className="mb-8 h-full md:mb-0 max-w-[299px] flex-[.5] flex min-w-full flex-col justify-between bg-primary-bg-100 p-4 rounded-2xl js-tilt mealreco">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xs">Streaks</p>
        <Image src={progress1} alt="progress" />
      </div>
      <div className="flex justify-between items-center">
        <Image src={streaks} alt="streak" />
        {streakCount == 0 ? (
          <p className="text-[20px] font-bold p-5">No streak!</p>
        ) : (
        <div className="flex gap-2 text-[20px] font-bold p-5">{streakCount} {streakCount <= 1 ? <p>day</p>: <p>days</p>}</div>
        )}
      </div>
      {
        streakCount == 0 ? (
          <h1 className="text-[14px] font-bold text-primarygtext">You haven't read any AI generated blogs😢</h1>
        ) : (
          <h1 className="text-[14px] font-bold text-primarygtext">You've read AI generated blogs for <span className="text-neutrals-100">{streakCount}</span> days straignt!</h1>
        )
      }
    </div>
  );
};

export default DashboardProgressTracker;
