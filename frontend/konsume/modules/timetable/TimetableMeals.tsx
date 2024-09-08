import React from 'react'
import BreakfastCard from './BreakfastCard'
import Image from 'next/image'
import LunchCard from './LunchCard'
import DinnerCard from './DinnerCard'

const TimetableMeals = () => {
  return (
    <div className='flex gap-10 items-center justify-center font-satoshi'>
        <div className='flex-col flex items-center gap-11'>
            <BreakfastCard />
            <Image src='/rectangle.svg' width={212} height={240} alt='rectangle'/>
        </div>
        <div className='flex-col flex items-center gap-11'>
            <Image src='/curved_circle.svg' width={212} height={212} alt='cirdle'/>
            <LunchCard />
        </div>
        <div className='flex-col flex items-center gap-11'>
            <DinnerCard />
            <Image src='/decagon.svg' width={212} height={212} alt='rectangle'/>
        </div>
    </div>
  )
}

export default TimetableMeals