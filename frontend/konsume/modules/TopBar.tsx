import Image from 'next/image'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge';
import GoogleTranslateWrapper from './GoogleTranslateWrapper';
import Link from 'next/link';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google: any;
  }
}

const TopBar = ({ setToggled, className, topBarText, topBarIcon }: any) => {
  const navClick = () => {
    setToggled((prev: any) => !prev);
  };

  // const textt = document.getElementById('goog-te-gadget')


  return (
    <div className={twMerge(' right-0 left-0 md:ml-[100px] md:mr-7 flex justify-between  md:px-10 px-5 md:py-5 py-4 font-satoshi shadow-bordershad border-b-[1px] border-[#4a4a682e] bg-[#fafafa7d] z-10', className)}>
      <div className='gap-5 items-center md:flex hidden'>
        <Image alt='chatai' src={`/${topBarIcon}.svg`} width={30} height={30} />
        <p className=' font-bold text-desktop-content'>{topBarText}</p>
      </div>
      <Image alt='logo' src={`/konsume_logo.svg`} width={30} height={30} className='md:hidden block' />
      <div className='flex gap-4 items-center justify-between'>

        <GoogleTranslateWrapper />
        <div className='flex gap-4 items-center justify-center'>
          {/* <div className='googleTranslateWrapper bg-success-200'>
          <div id="google_translate_element"></div>
        </div> */}
          <div className='md:block hidden ' >
            <Image src='/icon2.svg' alt='' width={15} height={15} />
          </div>
          <Image src='/notifications.svg' alt='' width={15} height={15} className='w-[15px] h-[15px] md:block hidden' />
          <Link href='/profile'>    
          <Image src='/avatar.svg' alt='' width={40} height={40} className='md:block hidden' />
          </Link>
        </div>
      </div>
        <Image src='/hamburger.svg' alt='' width={40} height={40} className='md:hidden block cursor-pointer' onClick={navClick} />
    </div>
  )
}

export default TopBar