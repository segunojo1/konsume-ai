import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import kons from "../../public/konsume_purple_logo.svg";
import ham from "../../public/assets/hamburger.png";
import down from "../../public/icon_down.svg";

const Footer = () => {
  const [toggled, setToggled] = useState(false);
  const navClick = () => {
    console.log(toggled);

    setToggled((prev) => !prev);
  };
  return (
    <div className="bg-primarytext mt-[128px] mb-[100px] mx-[26px] rounded-[34px] gap-[28px] flex flex-col items-center py-[42px] px-[51px]">
      <div className="justify-between flex w-full ">
        <Image src="/konsumee.svg" alt="" height={88} width={324} className="w-[200px] md:w-[324px]" />
        <Image src="/lunch.svg" alt="" height={85} width={85} />
      </div>
      <Image src="/footerpan.svg" alt="" height={88} width={3240} />
      <div className="flex items-center justify-between w-full  z-[99999]">
        <div className="flex items-center gap-[13px] font-bold text-[25px]/[120%]">
          <Image src={kons} alt="logo" className=" z-[1] " />
          <p className="text-secondary-400 font-bold text-[21px]">Konsume</p>
        </div>
        <div
          className={`md:flex hidden  items-center md:justify-between gap-6  w-fit h-full md:relative md:flex-row bottom-0 absolute  md:rounded-[42px] md:p-0 py-9 md:bg-transparent z-[100] md:bg-[white] bg-primarygtext `}
        >
          <ul className="flex items-center text-[20px]/[120%] font-medium gap-6 py-[15px] px-[25px] w-full md:flex-row md:text-base-black text-[white] flex-col h-1/3">
            <li className=" font-medium text-lg">Magic</li>
            <li className=" font-medium text-lg">Features</li>
            <li className=" font-medium text-lg">Coolness</li>
            <li className=" font-medium text-lg">FAQs</li>
            <li className=" font-medium text-lg">Contact</li>
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-[6px]">
          <Button className="text-[17px]/[120%] font-medium bg-color8-100 text-primarygtext py-[12px] pl-[25px] pr-[12px] flex gap-3 rounded-[42px]">
            Personal
            <Image src={down} alt="down" width={25} height={25} />
          </Button>
          <Link href="/auth/signup">
            <button className="cursor-pointer text-[17px]/[120%] font-bold bg-secondary-400 text-primarygtext w-[123px] py-[10px] rounded-[49px] md:m-0 mb-[30px]">
              Join Us
            </button>
          </Link>
        </div>
        <Image
          src={ham}
          alt="hamburger"
          className="md:hidden block z-[100]"
          onClick={navClick}
        />
      </div>
    </div>
  );
};

export default Footer;
