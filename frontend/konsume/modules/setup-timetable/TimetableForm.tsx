import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const TimetableForm = () => {
  return (
    <div className='bg-color8-100 px-6 py-[30px] flex flex-col items-center w-fit mx-auto gap-5 shadow-sm z-30 rounded-[10px]'>
        <div className='flex items-center gap-2 relative w-fit font-bold   '>
            <h1 className='md:text-desktop-hero  text-mobile-heading1'>Tell Us About </h1>
            <div className=' '>
                <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[134px] w-[134.16px] absolute 2xl:top-5 xl:top-1 right-[0] z-0' />
                <h1 className=' md:text-desktop-hero  text-mobile-heading1 relative z-50'>Your Meals</h1>
            </div>
        </div>

        <p className=' text-primarytext text-[18px]/[120%] font-medium self-start'>Tell Us About Your Meals:<br />
        <span className=' text-desktop-content font-normal'>List up to 10 meals you typically enjoy.</span></p>

        <textarea name="" id=""  rows={7} className='px-3 py-2 bg-primary-bg text-[#8C8CA1] shadow-shad focus:bg-[#FFFFFF] font-worksans text-[14px]/[140%] font-medium focus:border-primarygtext focus:shadow-focusshad border  w-full rounded-[8.72px] outline-none'>ddd</textarea>
        <p className='self-start text-primarytext text-[18px]/[120%] font-medium'>Budget:<br />
        <span className=' text-desktop-content font-normal'>What's your budget for food?, If you have</span></p>
        <Input placeholder='$2000'/>
        <Button
          type="submit"
          className="mt-16 flex items-center justify-center mx-auto p-2 w-full md:w-[400px] h-[2.9rem] text-primary-bg-100 bg-primarygtext"
          
        >
          Continue
        </Button>
    </div>
  )
}

export default TimetableForm