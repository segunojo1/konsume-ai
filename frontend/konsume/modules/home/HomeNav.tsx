import React, { useState } from 'react';
import logo from '../../public/assets/homelogo.png';
import kons from '../../public/konsume_purple_logo.svg';
import ham from '../../public/assets/hamburger.png';
import down from '../../public/icon_down.svg'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomeNav = () => {
  const [toggled, setToggled] = useState(false);
  const navClick = () => {
    console.log(toggled);
    
    setToggled((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-between mb-[232px] md:px-[90px] px-[19px] pt-[51px] z-[99999]">
      <div className='flex items-center gap-[13px] font-bold text-[25px]/[120%]'>
      <Image src={kons} alt="logo" className=" z-[1] " />
      <p className='text-primarygtext'>Home</p>
      </div>
      <iframe src="https://lottie.host/embed/0322d473-f9f4-4a72-b20b-042d823c5775/RfP87MEfHL.json" className='absolute z-50'></iframe>
      <div
        className={`flex  items-center md:justify-between gap-6  w-fit h-full md:relative md:flex-row flex-col ${
          toggled ? 'left-0' : 'left-[-200px]'
        } md:left-0 transition-all bottom-0 absolute  md:rounded-[42px] md:p-0 py-9 md:bg-transparent z-[100] md:bg-[white] bg-primarygtext `}
      >
        <ul className="flex items-center text-[20px]/[120%] font-medium gap-6 py-[15px] px-[25px] w-full md:flex-row md:text-base-black text-[white] flex-col h-1/3">
          <li className=" font-medium text-lg">Magic</li>
          <li className=" font-medium text-lg">Features</li>
          <li className=" font-medium text-lg">Coolness</li>
          <li className=" font-medium text-lg">FAQs</li>
          <li className=" font-medium text-lg">Contact</li>
        </ul>
        <div className='flex flex-col items-center gap-[6px] md:hidden '>

        <Link href="/auth/signup">
          <button className="cursor-pointer text-[17px]/[120%] font-bold bg-color8-100 text-primarygtext w-[123px] py-[10px] rounded-[49px] md:m-0 mb-[30px]">
            Join Us
          </button>
        </Link>
      </div>
      </div>
      <div className='hidden md:flex items-center gap-[6px]'>

        <Button className='text-[17px]/[120%] font-medium bg-color8-100 text-primarygtext py-[12px] pl-[25px] pr-[12px] flex gap-3 rounded-[42px]'>
          Personal 
          <Image src={down} alt='down' width={25} height={25}/>
        </Button>
        <Link href="/auth/signup">
          <button className="cursor-pointer text-[17px]/[120%] font-bold bg-color8-100 text-primarygtext w-[123px] py-[10px] rounded-[49px] md:m-0 mb-[30px]">
            Join Us
          </button>
        </Link>
      </div>
      <Image src={ham} alt="hamburger" className="md:hidden block z-[100]" onClick={navClick} />
    </div>
  );
};

export default HomeNav;
