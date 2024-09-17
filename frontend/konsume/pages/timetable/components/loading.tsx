"use client";

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
    <div className="h-screen w-full flex justify-center">
      <div className="relative w-64 h-64">
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
      </div>
    </div>
  );
}
export default Loading;