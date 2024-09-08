"use client"
import React, { useContext, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { useSetupContext } from "@/context/SetupContext";
import MealsContext from "@/context/MealsContext";

const DashboardHead = () => {
  const {user} = useContext(MealsContext);
  const firstName = user?.split(" ");

  useEffect(() => {
    
  }, [ ])

  // const textForUserGoal = dashboardhero
  //   .filter(({ title }) => title == userGoal)
  //   .map(({ text }) => text);

  return (
    <div className="font-satoshi mb-9 ">
      <div className='flex justify-between w-full '>
        <div className="relative w-fit">
          <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-[999] relative">Hello, {firstName ? firstName[0] : ".."}</h1>
        </div>      
        <SearchBar />
      </div>
    </div>
  );
};

export default DashboardHead;