"use client"
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardContext from "@/context/DashboardContext";
import ProgressTracker from "./body/DashboardProgressTracker";
import SpotlightedMealCard from "./body/SpotlightedMealCard";
import DashboardQuickActions from "./body/DashboardQuickActions";
import DashboardMeals from "./body/DashboardMeals";
import DashboardProgressTracker from "./body/DashboardProgressTracker";
import DashboardHighlights from "./body/DashboardHighlights";
import { Button } from "@/components/ui/button";
import BlogCard from "../blog/BlogCard";
import BlogContext from "@/context/BlogContext";
import { BlogProps } from "@/@types";

const DashboardBody = () => {
  const { breakfast, lunch, dinner, loading, getRandomMeals } = useContext(DashboardContext);
  const {blogs}  = useContext(BlogContext);
  const [showTimetable, setShowTimetable] = useState(false);
  const [randomBlog, setRandomBlog] = useState<BlogProps>();
  useEffect(() => {
    const timer1 = setTimeout(() => { }, 2000);
    const timer2 = setTimeout(() => {
      getRandomMeals();
    }, 4000);

    if (blogs.length > 1) {
      setRandomBlog(blogs[Math.floor(Math.random() * blogs.length)])
    }

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
      <div className="flex flex-col justify-between gap-4 md:px-5 flex-[.7] text-primarygtext">
        <div className="flex flex-col md:flex-row gap-2 text-primarygtext">
          <SpotlightedMealCard meal={breakfast} loading={loading} />
          <div className="md:flex w-full flex-[.5] hidden">
            <DashboardProgressTracker />
          </div>
          <Button className="cursor-pointer md:hidden bg-primarygtext mb-3 text-primary-bg-100 font-medium text-[12px] rounded-lg py-[11px] px-[32.5px] flex items-center justify-center" onClick={() => setShowTimetable(!showTimetable)}>
            {showTimetable ? "Close Todays Timetable" : "Open Todays Timetable"}
          </Button>
          {
            showTimetable && (
              <DashboardMeals
                breakfast={breakfast}
                lunch={lunch}
                dinner={dinner}
                loading={loading}
                onNavigate={handleNavigate}
                className="md:hidden"
              />
            )
          }
        </div>
        <div className="md:block hidden">
          <DashboardQuickActions />
        </div>
        <div className="md:flex ">
          <DashboardHighlights loading={loading} />
        </div>
      </div>
      <div className="md:flex-[.5] md:hidden md:min-w-fit min-w-full mt-4">
        {
          randomBlog && <BlogCard key={randomBlog.id} title={randomBlog.title} text={randomBlog.text} category={randomBlog.category} showHeading/>
        }

      </div>
      <DashboardMeals
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
        loading={loading}
        onNavigate={handleNavigate}
        className="md:flex hidden"
      />
    </div>
  );
};

export default DashboardBody;
