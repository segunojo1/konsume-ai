"use client"
import React, { useContext, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { useSetupContext } from "@/context/SetupContext";
import MealsContext from "@/context/MealsContext";
import Image from "next/image";
import DashboardContext from "@/context/DashboardContext";

const DashboardHead = () => {
  const { user } = useContext(MealsContext);
  const { showInput, setShowInput } = useContext(DashboardContext)
  const firstName = user?.split(" ");

  useEffect(() => {

  }, [])

  // const textForUserGoal = dashboardhero
  //   .filter(({ title }) => title == userGoal)
  //   .map(({ text }) => text);

  return (
    <div className="font-satoshi mb-9 ">
      <div className='flex justify-between w-full '>
        <div className="relative w-fit">
          <Image src='/multi-line.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 -z-10' />
          <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {firstName ? firstName[0] : ".."}</h1>
        </div>
        <SearchBar />
        {showInput && <p>hello</p>}
      </div>
    </div>
  );
};

export default DashboardHead;