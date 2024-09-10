"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface DashboardMealsProps {
  breakfast: string;
  lunch: string;
  dinner: string;
  loading: boolean;
  onNavigate: (meal: string) => void;
}

const DashboardMeals: React.FC<DashboardMealsProps> = ({ breakfast, lunch, dinner, loading, onNavigate }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);
  const renderMealCard = (meal: string, label: string) => (
    <div
      onClick={() => onNavigate(meal)}
      className="justify-between flex flex-col min-h-[130px] bg-primary-bg-100 px-3 pt-3 relative rounded-lg opacity-70"
    >
      <div className="flex justify-between">
        <p className="text-primarygtext font-bold text-mobile-caption">{label}</p>
      </div>
      {loading ? (
        <LoaderCircle className="my-auto animate-spin mx-auto" />
      ) : (
        <div className="flex justify-between flex-col mb-14">
          <div>{isMounted ? (
            <p className="text-[#1E5E08] font-bold text-[15px]">{meal ? meal : "No meal available"}</p>
          ) : (
            <p>...</p>
          )}</div>
          <p className="text-color8-700 font-medium text-[11.2px]">
            Nutritious bean cake high in protein and fiber.
          </p>
        </div>
      )}
      <Button className="bg-base-white text-[#8C77EC] font-bold text-[12px] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
        View Recipe and Details
      </Button>
    </div>
  );

  return (
    <div className="bg-color8 p-5 gap-2 flex flex-col rounded-2xl js-tilt flex-[.4]">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xs text-white">Today&apos;s Spotlighted Meal</p>
        <Image src="/breakfast.svg" alt="food" width={33} height={33} />
      </div>
      <Button className="bg-primarygtext text-primary-bg-100 font-medium text-[12px] rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
        Open in Timetable
      </Button>
      {renderMealCard(breakfast, "Breakfast")}
      {renderMealCard(lunch, "Lunch")}
      {renderMealCard(dinner, "Dinner")}
    </div>
  );
};

export default DashboardMeals;
