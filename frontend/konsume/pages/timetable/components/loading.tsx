"use client";

import { DashboardBlogSkeleton } from "@/components/skeleton-loaders/DashboardBlogSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState, useEffect } from "react";

const Loading = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 16);

    return () => clearInterval(intervalId);
  }, []);

  const images = [
    { src: "/breakfast-icon-image.png", width: 106, height: 120 },
    { src: "/lunch-icon-image.png", width: 106, height: 106 },
    { src: "/dinner-icon-image.png", width: 106, height: 106 },
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center gap-12">
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
      <Skeleton className="h-[54px] w-[200px] rounded-md border"/>
      <div className="flex items-center gap-5">
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      <Skeleton className="h-[81px] w-[103px] rounded-md border"/>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-6">
          <DashboardBlogSkeleton />
          <Skeleton className="h-[240px] w-[212px] rounded-2xl"/>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Skeleton className="h-[212px] w-[212px] rounded-full"/>
          <DashboardBlogSkeleton />
        </div>
        <div className="flex flex-col items-center gap-6">
          <DashboardBlogSkeleton />
          <Skeleton className="h-[212px] w-[212px] rounded-full"/>

        </div>
      </div>
    </div>
  );
}
export default Loading;