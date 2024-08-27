import React, { useContext, useEffect, useState } from "react";
import Sidebar from "@/modules/Sidebar";
import ScannerHead from "@/modules/scanner/ScannerHead";
import ScannerBody from "@/modules/scanner/ScannerBody";
import DashboardNav from "@/modules/dashboard/DashboardNav";
import withAuth from "../../helpers/withAuth";
import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import MainLayoutContext from "@/context/LayoutContext";
import Cookies from "js-cookie";
import SetupContext from "@/context/SetupContext";

const Scanner = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const { showScanner, setShowScanner }: any = useContext(SetupContext);
  useEffect(() => {
    const konsumeUsername = Cookies.get('konsumeUsername');
    setUsername(konsumeUsername);
  }, []);
  return (
    <div className="font-satoshi">
      <MainLayout fixedTopbar={true} includeMarginTop={true}>
        <div
          className=""
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-7">

              <div className="relative w-fit">
                <Image src='/multipleline.svg' alt='multi line' height={141} width={153} className='  absolute bottom-0 top-0 my-auto right-0 -z-50' />
                <h1 className="md:text-desktop-heading1 text-[28px]/[40px] font-bold z-50">Hello, {username ? username : '...'}  </h1>
              </div>
              <p className=" text-desktop-highlight italic max-w-[450px]">Chat with our AI bot for personalized nutrition tips, recipes, and meal plans. Get instant, tailored advice to reach your health goals!</p>
            </div>
            <div onClick={() => setShowScanner(true)}>
              <Image src='/tryscanner.svg' alt='multi line' height={141} width={153} className=' ' />
            </div>
          </div>
          <ScannerBody />
        </div>
      </MainLayout>
    </div>
  );
};

export default withAuth(Scanner);
