import Image from 'next/image'
import React, { useState } from 'react'

const FilterMeal = ({text, src, isActive, onChangeMeal}: any) => {
    const [activeMeal, setActiveMeal] = useState('All');
    const handleClick = () => {
        onChangeMeal(text);
      };
  return (
    <div className='flex gap-3 items-center cursor-pointer'>
        {src && <Image alt='meal' width={27.6} height={27.6} src={src}/>  }
        <div className={`rounded-[40px] px-[18px] py-[5px] text-desktop-content ${isActive ? 'bg-primarygtext text-base-white': 'border-[1.5px] border-primarygtext text-primarygtext'}`} onClick={handleClick}>
            {text}
        </div>
    </div>
  )
}

export default FilterMeal