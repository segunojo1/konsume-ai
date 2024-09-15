"use client"
import Image from "next/image";
import scanner from "../../../public/restaurant.svg";
import tea from "../../../public/teacup.svg";
import { useContext, useEffect, useState } from "react";
import dashboard from "@/pages/dashboard";
import DashboardContext from "@/context/DashboardContext";
import { LoaderCircle } from "lucide-react";
import DashboardProgressTracker from "./DashboardProgressTracker";
import BlogCard from "@/modules/blog/BlogCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Button } from "@/components/ui/button";
interface DashboardHighlightsProp {
  loading: boolean;
}
const DashboardHighlights = ({ loading }: DashboardHighlightsProp) => {
  const { nutritionTea } = useContext(DashboardContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);
  return (
    <div className="md:flex flex-row md:min-w-[648px] md:mx-auto justify-between cursor-pointer font-jakarta">
      <div className="md:hidden flex h-[120%]">
        <Swiper
          // install Swiper modules
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1.1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="flex "
        >
          <SwiperSlide>
            <div className="flex flex-col bg-[#D6FBC4] p-4 rounded-2xl js-tilt h-[80%] mealreco md:min-w-fit min-w-full md:flex-[.5]">
              <div className="flex justify-between items-center mb-5">
                <p className="font-bold text-xs">Restaurant Track</p>
                <Image src={scanner} alt="restaurant" />
              </div>
              <Button className="bg-[#fafafa86] border-primary-bg-100 border-2 mx-auto mt-10 text-primarygtext font-medium text-xs rounded-lg py-[11px] px-[32.5px] flex items-center gap-2 justify-center">
                <Image src="/icon7.svg" height={27.6} width={27.6} alt="icon" />
                <p className="text-mobile-caption font-bold">Setup Restaurant Profile</p>
              </Button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" h-[80%] flex md:hidden">
              <DashboardProgressTracker />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-primary-bg p-4 rounded-2xl js-tilt mb-8 h-[80%] mealreco md:flex-[.5] daily-tea">
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
                    {isMounted ? nutritionTea : ".."}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
          ...
        </Swiper>
      </div>
      {/* <div className="hidden md:flex flex-row gap-2 justify-between cursor-pointer font-jakarta"> */}
        <div className="md:max-w-[299px] h-[227px] hidden md:flex flex-col justify-between bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco md:min-w-fit  min-w-full md:flex-[.5]">
          <div className="flex justify-between items-center mb-5">
            <p className="font-bold text-xs">Restaurant Track</p>
            <Image src={scanner} alt="restaurant" />
          </div>
          <Button className="bg-[#fafafa86] mx-auto mt-10 text-primarygtext font-medium text-xs rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
            <Image src="/icon5.svg" height={27.6} width={27.6} alt="icon" />
            <p className="text-mobile-caption font-bold">Setup Restaurant Profile</p>
          </Button>
        </div>
        {/* <div className="md:flex-[.5] md:min-w-fit min-w-full">
      <BlogCard category="nutrition" title="Eating Healthy" text="djjkdjsjksjks" showHeading/>
      </div> */}

        {/* <div className="flex md:hidden">
          <DashboardProgressTracker />
        </div> */}

        <div className="max-w-[299px] hidden md:flex flex-col gap-6 bg-primary-bg p-4 rounded-2xl js-tilt h-full mealreco md:flex-[.5] daily-tea">
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
                {isMounted ? nutritionTea : ".."}
              </p>
            )}
          </div>
        </div>
      {/* </div> */}

    </div>
  );
};

export default DashboardHighlights;
