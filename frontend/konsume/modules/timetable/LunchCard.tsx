import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const LunchCard = () => {
  return (
    <div className='flex flex-col items-start gap-9 py-6 px-3 shadow-sm rounded-[34px] bg-neutrals-200 hover:shadow-lg'>
            <div
                className="justify-between flex flex-col min-h-[130px] z-40 bg-color8-100 px-3 pt-3 relative rounded-lg"
            >
                <div className="flex justify-between">
                    <p className="text-primarygtext font-bold text-mobile-caption">Lunch</p>
                </div>
                <div className="flex justify-between flex-col mb-14">
                    <p className="text-[#1E5E08] font-bold text-[15px]">moi moi</p>
                    <p className="text-color8-700 font-medium text-[11.2px]">
                        Nutritious bean cake high in protein and fiber.
                    </p>
                </div>
                <Button className="bg-base-white text-[#8C77EC] font-bold text-[12px] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
                    View Recipe and Details
                </Button>
            </div>
            <div className='flex gap-5 items-center'>
                <Image src='/expand_meal.svg' width={39} height={32} alt='expand' className='hover:rotate-12 cursor-pointer'/>
                <p className='font-bold text-[14px]/[120%]'>Expand Meal Card</p>
            </div>
        </div>
  )
}

export default LunchCard