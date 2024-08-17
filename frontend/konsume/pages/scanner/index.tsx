import React, { useState } from "react";
import Sidebar from "@/modules/dashboard/Sidebar";
import ScannerHead from "@/modules/scanner/ScannerHead";
import ScannerBody from "@/modules/scanner/ScannerBody";
import DashboardNav from "@/modules/dashboard/DashboardNav";
import withAuth from "../../helpers/withAuth";
import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";

const Scanner = () => {
  const [toggled, setToggled] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  return (
    <div className="font-satoshi">
      <MainLayout>
      <div
        className={`${toggled ? "" : "md:ml-[100px]"} gap-5 flex flex-col px-5`}
      >
        <DashboardNav toggled={toggled} setToggled={setToggled} />
        {/* <DashboardBody /> */}
        <div className="flex justify-between">
                  <div className="flex flex-col gap-7">

                    <div className="relative w-fit">
                      <Image src='/multipleline.svg' alt='multi line' height={141} width={153} className='  absolute bottom-0 top-0 my-auto right-0 -z-50' />
                      <h1 className="md:text-desktop-heading1 text-[28px]/[40px] font-bold z-50">Hello, Segun </h1>
                    </div>
                    <p className=" text-desktop-highlight italic max-w-[450px]">Chat with our AI bot for personalized nutrition tips, recipes, and meal plans. Get instant, tailored advice to reach your health goals!</p>
                  </div>
                  <div onClick={() => setShowScanner(true)}>
                    <Image src='/tryscanner.svg' alt='multi line' height={141} width={153} className=' ' />
                  </div>
                </div>
        <ScannerBody showScanner={showScanner} setShowScanner={setShowScanner}/>
      </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(Scanner);
