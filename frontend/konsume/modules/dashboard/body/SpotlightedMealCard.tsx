import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import star from "../../../public/meal.svg";
import { LoaderCircle } from "lucide-react";

interface SpotlightedMealCardProps {
  meal: string;
  loading: boolean;
}

const SpotlightedMealCard: React.FC<SpotlightedMealCardProps> = ({ meal, loading }) => {
  return (
    <div className="flex-[.5] bg-secondary-100 p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco relative">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xs text-white">Today&apos;s Spotlighted Meal</p>
        <Image src={star} alt="star" />
      </div>
      {loading ? (
        <LoaderCircle className="my-auto animate-spin mx-auto" />
      ) : (
        <div className="gap-2 flex flex-col">
          <p className="text-[15px] font-bold">{meal}</p>
          <p className="text-color8-700 font-medium text-[11.2px] mb-14">
            Nutritious bean cake high in protein and fiber.
          </p>
          <Button className="bg-base-white text-[#8C77EC] font-bold text-[12px] rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
            View Recipe and Details
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpotlightedMealCard;
