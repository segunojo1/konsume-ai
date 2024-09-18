"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import MealsContext from "@/context/MealsContext";

interface DashboardMealsProps {
  breakfast: string;
  lunch: string;
  dinner: string;
  loading: boolean;
  className ?: string;
}

const DashboardMeals: React.FC<DashboardMealsProps> = ({ breakfast, lunch, dinner, loading, className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const {tempMeals} = useContext(MealsContext);
  const [randomMeal, setRandomMeal] = useState<any>();

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (tempMeals.length > 1) {
      setRandomMeal(tempMeals[Math.floor(Math.random() * tempMeals.length)])
    }
  }, [tempMeals])
  const renderMealCard = (meal: string, label: string) => (
    <div
      className="space-y-7 flex flex-col min-h-[145px] bg-primary-bg-100 px-3 pt-3 relative rounded-lg opacity-70"
    >
      <div className="flex justify-between">
        <p className="text-primarygtext font-bold text-mobile-caption">{label}</p>
      </div>
      {loading ? (
        <LoaderCircle className="my-auto animate-spin mx-auto" />
      ) : (
        <div className="flex justify-between flex-col ">
          <div>{isMounted ? (
            <p className="text-[#1E5E08] font-bold text-[15px]">{randomMeal ? randomMeal?.name : "No meal available"}</p>
          ) : (
            <p>...</p>
          )}</div>
          <p className="text-color8-700 font-medium text-[11.2px]">
            Nutritious bean cake high in protein and fiber.
          </p>
        </div>
      )}
      <Link href={`/meals/${meal}`} className="bg-base-white text-[#8C77EC] font-bold text-[12px] right-0 absolute bottom-0 rounded-[8.8px] h-[34px] w-[154px] flex items-center justify-center">
        View Recipe and Details
      </Link>
    </div>
  );

  return (
    <div className={twMerge("max-w-[299px] bg-color8 p-5 px-[28.5px] gap-2 flex flex-col rounded-2xl js-tilt flex-[.4]", className)}>
      <div className="flex justify-between items-center">
        <p className="font-bold md:text-desktop-caption  text-white">Today&apos;s Spotlighted Meal</p>
        <Image src="/breakfast.svg" alt="food" width={33} height={33} />
      </div>
      <Link href="/timetable" className="bg-primarygtext text-primary-bg-100 font-medium text-[12px] rounded-lg py-[11px] px-[32.5px] flex items-center justify-center max-w-[242px]">
        Open Timetable
      </Link>
      {renderMealCard(breakfast, "Breakfast")}
      {renderMealCard(lunch, "Lunch")}
      {renderMealCard(dinner, "Dinner")}
    </div>
  );
};

export default DashboardMeals;
