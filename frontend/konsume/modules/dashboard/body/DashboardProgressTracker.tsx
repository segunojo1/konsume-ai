import React from "react";
import Image from "next/image";
import progress1 from "../../../public/progress1.svg";
import { Button } from "@/components/ui/button";

const DashboardProgressTracker: React.FC = () => {
  return (
    <div className="mb-8 h-full md:mb-0 max-w-[299px] flex-[.5] flex min-w-full flex-col justify-between bg-primary-bg-100 p-4 rounded-2xl js-tilt mealreco">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xs">Progress Tracker</p>
        <Image src={progress1} alt="progress" />
      </div>
      <Button className="bg-[#fafafa86] mx-auto mt-10 text-primarygtext font-medium text-xs rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
        <Image src="/icon5.svg" height={27.6} width={27.6} alt="icon" />
        <p className="text-mobile-caption font-bold">Setup Progress Tracker</p>
      </Button>
    </div>
  );
};

export default DashboardProgressTracker;
