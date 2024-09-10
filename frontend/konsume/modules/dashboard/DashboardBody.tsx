"use client"
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardContext from "@/context/DashboardContext";
import ProgressTracker from "./body/DashboardProgressTracker";
import SpotlightedMealCard from "./body/SpotlightedMealCard";
import DashboardQuickActions from "./body/DashboardQuickActions";
import DashboardMeals from "./body/DashboardMeals";
import DashboardProgressTracker from "./body/DashboardProgressTracker";
import DashboardHighlights from "./body/DashboardHighlights";
import { Button } from "@/components/ui/button";

const DashboardBody = () => {
  const { breakfast, lunch, dinner, loading, getRandomMeals } = useContext(DashboardContext);

  useEffect(() => {
    const timer1 = setTimeout(() => { }, 2000);
    const timer2 = setTimeout(() => {
      getRandomMeals();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const router = useRouter();

  const handleNavigate = (meal: string) => {
    router.push({
      pathname: "/dashboard/meal-details",
      query: { meal: encodeURIComponent(meal) },
    });
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="flex flex-col justify-between px-5 flex-[.7] text-primarygtext">
        <div className="flex flex-col md:flex-row gap-2 text-primarygtext">
          <SpotlightedMealCard meal={breakfast} loading={loading} />
          <div className="md:flex w-full flex-[.5] hidden">
            <DashboardProgressTracker />
          </div>
          <Button className="md:hidden bg-primarygtext mb-3 text-primary-bg-100 font-medium text-[12px] rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
            Open Today&apos;s Timetable
          </Button>
        </div>
        <div className="md:block hidden">
          <DashboardQuickActions />
        </div>
        <div className="md:flex ">
        <DashboardHighlights loading={loading} />
        </div>
      </div>
      <DashboardMeals
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
        loading={loading}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default DashboardBody;
