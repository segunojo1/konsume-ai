"use client"
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { useSetupContext } from "@/context/SetupContext";
import MealsContext from "@/context/MealsContext";
import Image from "next/image";
import DashboardContext from "@/context/DashboardContext";
import useIsClient from "@/hooks/useIsClient";
import { useUserContext } from "@/context/UserContext";

const DashboardHead = () => {
  const {username} = useUserContext();
const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
useEffect(() => {
  
  setFirstName(username?.split(" ")[0] ?? "");
}, [username]);

//   const { user, setUser } = useContext(MealsContext);
  
//   const isClient = useIsClient(); // Check if we're on the client side
// useEffect(() => {
//   if (isClient) {
//     const storedUsername = localStorage.getItem('konsumeUsername');
//     if (storedUsername) {
//       setUser(storedUsername);
//     }
//   }
// }, [isClient]); 



  // const textForUserGoal = dashboardhero
  //   .filter(({ title }) => title == userGoal)
  //   .map(({ text }) => text);

  return (
    <div className="font-satoshi mb-9 ">
      <div className='flex justify-between w-full items-center '>
        <div className="relative w-fit">
          <Image src='/multi-line.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 -z-10' />
          <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {firstName ? firstName : '..'}</h1>
        </div>
        <div className="search-meal">
        <SearchBar />
        </div>
      </div>
        
    </div>
  );
};

export default DashboardHead;