import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardContext from "@/context/DashboardContext";
import ProgressTracker from "./body/DashboardProgressTracker";
import SpotlightedMealCard from "./body/SpotlightedMealCard";
import DashboardQuickActions from "./body/DashboardQuickActions";
import DashboardMeals from "./body/DashboardMeals";
import DashboardProgressTracker from "./body/DashboardProgressTracker";
import DashboardHighlights from "./body/DashboardHighlights";

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
    <div className="flex">
      <div className="flex md:flex-col flex-row justify-between px-5 flex-[.7] text-primarygtext">
        <div className="flex gap-2 text-primarygtext">
          <SpotlightedMealCard meal={breakfast} loading={loading} />
          <DashboardProgressTracker />
        </div>

        <DashboardQuickActions />
        <DashboardHighlights />
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
