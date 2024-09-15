"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import star from "../../../public/meal.svg";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SpotlightedMealCardProps {
  meal: string;
  loading: boolean;
}


const SpotlightedMealCard: React.FC<SpotlightedMealCardProps> = ({ meal, loading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);
  return (
    <div className="md:max-w-[299px] h-[227px]  font-satoshi flex-[.5] w-full bg-secondary-100 p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco relative">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xs text-white">Today&apos;s Spotlighted Meal</p>
        <Image src={star} alt="star" />
      </div>
      {loading ? (
        <LoaderCircle className="my-auto animate-spin mx-auto" />
      ) : (
        <div className="gap-2 flex flex-col">
          {isMounted ? (
            <p className="text-[15px] font-bold">{meal ? meal : "No meal available"}</p>
          ) : (
            <p>Loading...</p>
          )}
          <p className="text-color8-700 font-medium text-[11.2px] mb-14">
            Nutritious bean cake high in protein and fiber.
          </p>
          <Link href={`/meals/${meal}`} className="bg-base-white text-[#8C77EC] font-bold text-[12px] rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
            View Recipe and Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default SpotlightedMealCard;
