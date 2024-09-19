"use client";

import { DashboardBlogSkeleton } from "@/components/skeleton-loaders/DashboardBlogSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 16);

    return () => clearInterval(intervalId);
  }, []);
  const [index, setIndex] = useState(0);

  const texts = [
    "Curating your personalized meal timetable...",
    "Analyzing your preferences and health goals...",
    "Organizing meals for optimal nutrition and balance...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Switch every 3 seconds
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="h-screen w-full flex flex-col items-center gap-12">
      {/* <video
        autoPlay
        muted
        loop
        style={{position: "absolute"}}
        className="my-auto bottom-0 top-0 z-50 h-fit"
      >
        <source src="/pan-animation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video> */}
      <div className="flex flex-col justify-start items-center h-screen absolute z-50 top-10">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-medium text-center mb-4"
        >
          {texts[index]}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-sm text-gray-600 text-center"
        >
          This may take up to a minute. Please be patient...
        </motion.p>
      </div>
      {/* <div className="relative w-64 h-64">
        {images.map((image, index) => {
          const angle = (rotation + index * 120) * (Math.PI / 180);
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;

          return (
            <div
              key={image.src}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              }}
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                className="drop-shadow-lg"
              />
            </div>
          );
        })}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse" />
        </div>
      </div> */}

      <Skeleton className="h-[54px] w-[200px] rounded-md border" />
      <div className="flex items-center gap-5">
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
        <Skeleton className="h-[81px] w-[103px] rounded-md border" />
      </div>
      <Image
        src="/tomato_illustration.svg"
        alt="happy"
        width={200}
        height={200}
        className="absolute z-50 animate-bounce my-auto bottom-0 top-0 h-fit"
      />

      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-6">
          <DashboardBlogSkeleton />
          <Skeleton className="h-[240px] w-[212px] rounded-2xl" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Skeleton className="h-[212px] w-[212px] rounded-full" />
          <DashboardBlogSkeleton />
        </div>
        <div className="flex flex-col items-center gap-6">
          <DashboardBlogSkeleton />
          <Skeleton className="h-[212px] w-[212px] rounded-full" />
        </div>
      </div>
    </div>
  );
};
export default Loading;
