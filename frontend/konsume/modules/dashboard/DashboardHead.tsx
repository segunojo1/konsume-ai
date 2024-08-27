import React, { useEffect, useState } from "react";
import { useSetupContext } from "../../context/SetupContext";
import { dashboardhero } from "./dashboardhero";
import Cookies from "js-cookie";
import SearchBar from "@/components/ui/SearchBar";

const DashboardHead = () => {
  const { userGoal } = useSetupContext();
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    setUser(Cookies.get('konsumeUsername'))
  }, [])

  const textForUserGoal = dashboardhero
    .filter(({ title }) => title == userGoal)
    .map(({ text }) => text);

  return (
    <div className="font-satoshi mb-9 ">
      <div className='flex justify-between w-full '>
        <div className="relative w-fit">
          <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-[999] relative">Hello, {user ? user : ".."}</h1>
        </div>      
        <SearchBar />
      </div>
    </div>
  );
};

export default DashboardHead;