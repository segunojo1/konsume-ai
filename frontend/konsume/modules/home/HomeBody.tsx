import Image from "next/image";
import Link from "next/link";
import React from "react";
import easier from "../../public/easier2.png";
import pan from "../../public/hero_pan.svg";
import pan2 from "../../public/pan2.svg";
import pann from "../../public/pann.svg";

import line from "../../public/rough-line.svg";
import line2 from "../../public/rough-line2.svg";
import card1 from "../../public/timetable-meal-info.svg";
import card2 from "../../public/dashboardmobile.svg";
import card3 from "../../public/timetable-meal-info.svg";
import card4 from "../../public/meals-card.svg";
import card5 from "../../public/nutrition-card.svg";
import card6 from "../../public/streak-card.svg";
import { Button } from "@/components/ui/button";

const HomeBody = () => {
  return (
    <div className=" gap-5 ">
      <div className="md:max-w-[800px] max-w-[349px] flex flex-col gap-[67px] md:self-start self-center mx-auto md:mx-0 z-50 md:px-[90px] ">
        <h1 className="text-[54px]/[65px] md:text-[118px]/[120%] z-50  font-bold tracking-[-7px] flex flex-col md:items-start justify-center items-center md:justify-start relative ">
          Eating Healthy has never been
          <Image
            src={easier}
            alt="easier"
            className="relative bottom-0 md:[337px] w-[177px] md:-left-4 "
            width={337}
            height={90}
          />
        </h1>
        <div className="cursor-pointer flex gap-[17px] ">
          <Link href="/auth/login" className="text-[19px] font-bold rounded-[40px] text-primarygtext bg-primary-bg px-[25px] py-[10px]">
            Log in
          </Link>
          <Link href="/auth/signup" className="z-[1000] text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]">
            Join Us
          </Link>
        </div>
      </div>
      <div className="  min-w-full">
        <div className="flex flex-col absolute left-0  min-w-full ">
          <Image
            src={line2}
            alt="line"
            className=" absolute min-w-full -top-6 min-h-[42px]"
          />
          <Image
            src={line}
            alt="line"
            className=" absolute min-w-full min-h-[42px]"
          />
        </div>
        <div className="bg-primary-bg mt-24  pt-28 flex flex-col gap-[7px] items-center justify-center">
          <h1 className="max-w-[326px] text-[42px]/[51px] font-bold">
            Serve Up Your Healthy Journey
          </h1>
          <Image
            src={pan2}
            alt="easier"
            className=" "
            width={168}
            height={168}
          />
          <div className="flex overflow-scroll md:overflow-hidden gap-[68px] h-[660px]">
            <Image
              src={card1}
              alt="card"
              className="h-[606px] "
              width={308}
              height={606}
            />
            <div className="md:relative w-[308px] h-[660px]">
              <Image
                src={card2}
                alt="card"
                className=" md:absolute bottom-0 w-[308px] h-[606px] "
                width={308}
                height={606}
              />
            </div>
            <Image
              src={card3}
              alt="card"
              className=" h-[606px] "
              width={308}
              height={606}
            />
          </div>
          <Link href="/auth/signup" className="mt-[85px] text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]">
            Join Us
          </Link>
        </div>
      </div>
      <div className="bg-primary-bg ">
        <div className=" flex flex-col gap-[8px] items-center justify-center pt-[141px] mb-[56px]">
          <h1 className="text-[42px]/[51px] font-bold">The Magic</h1>
          <p className="font-medium text-[22px]/[27px]">
            Here&apos;s what we&apos;re about
          </p>
        </div>
        <div className="flex justify-center gap-[47px] h-[460px]">
          <div className="relative w-[308px] h-[460px]">
            <Image
              src={card4}
              alt="card"
              className="h-[412px] absolute bottom-0  "
              width={301}
              height={412}
            />
          </div>
          <Image
            src={card5}
            alt="card"
            className=" h-[412px] "
            width={301}
            height={412}
          />
          <div className="relative w-[308px] h-[460px]">
            <Image
              src={card6}
              alt="card"
              className=" h-[412px] absolute bottom-0  "
              width={301}
              height={412}
            />
          </div>
        </div>
      </div>
      <Image
        src={pan}
        alt="easier"
        className="absolute hidden md:block top-10 right-0 z-0 "
        width={858}
        height={869}
      />
      <Image
        src={pann}
        alt="easier"
        className="absolute block my-auto top-0 bottom-0 md:hidden right-0 left-0 mx-auto z-0 "
        width={237}
        height={237}
      />
    </div>
  );
};

export default HomeBody;
