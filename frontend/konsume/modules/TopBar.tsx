import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge';

const TopBar = ({setToggled, className}:any) => {
  const navClick = () => {
    setToggled((prev:any) => !prev);
  };

  return (
    <div className={twMerge(' right-0 left-0 md:ml-[100px] md:mr-7 flex justify-between  px-10 py-5 font-satoshi shadow-bordershad border-b-[1px] border-[#4a4a682e] bg-[#fafafa7d] z-10', className)}>
      <div className='flex gap-5 items-center'>
        <Image alt='chatai' src='/chatlogo.svg' width={30} height={30}/>
        <p className=' font-bold text-desktop-content'>Chat with AI</p>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <div className='block md:hidden' onClick={navClick}>
        <Image src='/icon2.svg' alt='' width={15} height={15}/>
        </div>
        <Image src='/notifications.svg' alt='' width={15} height={15} className='w-[15px] h-[15px]'/>
        <Image src='/avatar.svg' alt='' width={40} height={40}/>
      </div>
    </div>
  )
}

export default TopBar