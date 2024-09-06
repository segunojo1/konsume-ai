import MealsContext from '@/context/MealsContext';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const FilterBlog = ({ text, src, isActive, onChangeMeal }: any) => {
  const { recommendedMeals, setTempMeals }: any = useContext(MealsContext);
  
  const handleClick = () => {
    onChangeMeal(text);
    // Filter meals based on the selected meal type
    let filteredMeals;
    if (text === 'All') {
      filteredMeals = recommendedMeals;
    } else {
      filteredMeals = recommendedMeals.filter((meal:any) => meal.course === text);
    }

    // Update the recommended meals with the filtered list
    setTempMeals(filteredMeals);
  };
  return (
    <div className='flex gap-3 items-center cursor-pointer'>
      {src && <Image alt='meal' width={27.6} height={27.6} src={src} />}
      <div className={`rounded-[40px] px-[18px] py-[5px] text-desktop-content ${isActive ? 'bg-primarygtext text-base-white' : 'border-[1.5px] border-primarygtext text-primarygtext'}`} onClick={handleClick}>
        {text}
      </div>
    </div>
  )
}

export default FilterBlog