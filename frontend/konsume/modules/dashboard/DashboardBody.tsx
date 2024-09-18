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
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { DashboardBlogSkeleton } from "@/components/skeleton-loaders/DashboardBlogSkeleton";

const DashboardBody = () => {
  const { breakfast, lunch, dinner, loading, getRandomMeals } = useContext(DashboardContext);
  const { blogs, loadingBlog } = useContext(BlogContext);
  const [showTimetable, setShowTimetable] = useState(false);
  const [randomBlog, setRandomBlog] = useState<BlogProps>();
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
  useEffect(() => {
    if (blogs.length > 1) {
      setRandomBlog(blogs[Math.floor(Math.random() * blogs.length)])
    }
  }, [blogs])

  const router = useRouter();


  return (
    <div className="flex md:flex-row flex-col ">
      <div className="flex flex-col justify-between  gap-4 md:px-5 flex-[.7] text-primarygtext ">
        <div className="md:min-w-[648px] md:mx-auto flex flex-col md:flex-row justify-between gap-2 text-primarygtext">
          <SpotlightedMealCard meal={breakfast} loading={loading} />
          <div className="md:flex w-full flex-[.5] hidden md:min-w-[299px] h-[227px] ">
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
                className="md:hidden transition-opacity"
              />
            )
          }
        </div>
        <div className="md:block hidden mx-auto md:min-w-[648px]">
          <DashboardQuickActions />
        </div>
        <DashboardHighlights loading={loading} />

      </div>
      <div className="md:flex-[.5] md:hidden md:min-w-fit min-w-full mt-4">
        {loadingBlog ? (
          <DashboardBlogSkeleton />
        ) : (<BlogCard key={randomBlog?.id} title={randomBlog?.title} text={randomBlog?.text} category={randomBlog?.category} showHeading />)
        }

      </div>
      {/* <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper> */}
      <DashboardMeals
        breakfast={breakfast}
        lunch={lunch}
        dinner={dinner}
        loading={loading}
        className="md:flex hidden"
      />
    </div>
  );
};

export default DashboardBody;
