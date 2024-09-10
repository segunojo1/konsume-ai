"use client"
import Image from "next/image";
import scanner from "../../../public/restaurant.svg";
import tea from "../../../public/teacup.svg";
import { useContext, useEffect, useState } from "react";
import dashboard from "@/pages/dashboard";
import DashboardContext from "@/context/DashboardContext";
import { LoaderCircle } from "lucide-react";
import DashboardProgressTracker from "./DashboardProgressTracker";

interface DashboardHighlightsProp {
  loading: boolean;
}
const DashboardHighlights = ({loading}: DashboardHighlightsProp) => {
  const {nutritionTea} = useContext(DashboardContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);
  return (
    <div className="flex md:overflow-visible overflow-scroll flex-row gap-2 cursor-pointer font-jakarta">
      <div className="bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco md:min-w-fit min-w-full md:flex-[.5]">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-xs">Restaurant Track</p>
          <Image src={scanner} alt="restaurant" />
        </div>
      </div>

      <div className="flex md:hidden">
      <DashboardProgressTracker />
      </div>

      <div className="bg-primary-bg p-4 rounded-2xl js-tilt h-full mealreco md:flex-[.5] daily-tea">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold">Daily Nutritional Tea</p>
          <Image src={tea} alt="tea" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-desktop-caption font-bold">"Did You Know"</h1>
          {loading ? (
        <LoaderCircle className="my-auto animate-spin mx-auto" />
      ) : (
          <p className="italic text-[12px]/[20px]">
            {isMounted ? nutritionTea : ".." }
          </p>
      )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHighlights;
