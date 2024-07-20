import React, { useState } from 'react';
import logo from '../../../public/assets/homelogo.png';
import ham from '../../../public/assets/hamburger.png';
import Image from 'next/image';
import { DashboardNavProps } from '../../../@types';

const MealNav: React.FC<DashboardNavProps> = ({ toggled, setToggled }) => {
  const navClick = () => {
    setToggled((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-between bg-[#C0DFB44D] border-[2.5px] rounded-[20px] border-[#DDF1D4] py-[11px] md:px-[63px] px-[30px] mt-8 md:mt-0 md:hidden ">
      <Image src={logo} alt="logo" className=" mr-20 w-[39px] md:w-[94px]" />
      {/* <div className={`flex  items-center md:justify-between gap-6  md:w-full w-fit h-full md:relative md:flex-row flex-col ${toggled ? 'left-0' : 'left-[-200px]'} md:left-0 transition-all bottom-0 absolute py-12 p-5 md:p-0 md:bg-transparent bg-[#DAFDC9] `}>
                <ul className='flex items-center justify-between w-full md:flex-row flex-col h-1/3'>
                    <li className=' font-medium text-lg'>About Us</li>
                    <li className=' font-medium text-lg'>How It Works</li>
                    <li className=' font-medium text-lg'>Features</li>
                </ul>
                <button className='bg-[#8DCF38] text-[#005450] w-[123px] py-[10px] rounded-[49px] md:ml-20' >Join Us</button>
            </div> */}
      <Image src={ham} alt="hamburger" className="md:hidden block" onClick={navClick} />
    </div>
  );
};

export default MealNav;
