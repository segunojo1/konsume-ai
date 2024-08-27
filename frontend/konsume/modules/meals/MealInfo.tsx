import Image from 'next/image'
import React from 'react'

const MealInfo = ({text, title}:any) => {
  return (
    <div className='shadow-bordershad border-2 bg-primary-bg-100  rounded p-6 font-satoshi'>
      <div className='flex justify-between items-center'>
        <h1 className=' text-desktop-highlight font-bold'>{title}</h1>
        <Image alt='' height={36} width={36} src='/star.svg'/>
      </div>
        <p className=' text-desktop-content mt-4'>{text}</p>
    </div>
  )
}

export default MealInfo