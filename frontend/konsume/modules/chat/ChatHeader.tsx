import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import MealsContext from "@/context/MealsContext";
import BlogContext from "@/context/BlogContext";
import { useUserContext } from "@/context/UserContext";

const ChatHeader = () => {
  const {username} = useUserContext();
const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
useEffect(() => {
  
  setFirstName(username?.split(" ")[0] ?? "");
}, [username]);
  return (
    <div className="flex justify-between md:p-0 p-6">
      <div className="flex flex-col gap-7">
        <div className="relative w-fit">
          <Image
            src="/multipleline.svg"
            alt="multi line"
            height={141}
            width={153}
            className="md:w-[150px] w-[70px] absolute bottom-0 top-0 my-auto right-0 -z-50"
          />
          <h1 className="md:text-desktop-heading1 text-[28px]/[40px] font-bold z-50">
            Hello, {firstName ? firstName : "..."}
          </h1>
        </div>
        <p className="text-desktop-highlight italic max-w-[450px]">
          Chat with our AI bot for personalized nutrition tips, recipes, and
          meal plans. Get instant, tailored advice to reach your health goals!
        </p>
      </div>
      <div className="backdrop-blur-lg">
        <Image
          src="/tryscanner.svg"
          alt="multi line"
          height={141}
          width={153}
          className="backdrop-blur-sm bg-white md:block hidden"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
