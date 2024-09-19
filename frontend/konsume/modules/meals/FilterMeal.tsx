import MealsContext from '@/context/MealsContext';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const FilterMeal = ({ text, src, isActive, onChangeMeal }: any) => {
  const [activeMeal, setActiveMeal] = useState('All');
  const { recommendedMeals, setRecommendedMeals, tempMeals, setTempMeals }: any = useContext(MealsContext);
  
  const handleClick = () => {
    onChangeMeal(text);
    // Filter meals based on the selected meal type
    let filteredMeals;
    if (text === 'All') {
      filteredMeals = recommendedMeals;
    } else {
filteredMeals = recommendedMeals.filter((meal:any) => meal.course.toLowerCase().includes(text.toLowerCase()));    }

    // Update the recommended meals with the filtered list
    setTempMeals(filteredMeals);
  };
  return (
    <div className='flex gap-3 items-center cursor-pointer'>
      {src && <Image alt='meal' width={27.6} height={27.6} src={src} className='xl:block hidden'/>}
      <div className={`rounded-[40px] md:px-[18px] px-3 md:py-[5px] py-1 md:text-desktop-content text-mobile-caption ${isActive ? 'bg-primarygtext text-base-white' : 'border-[1.5px] border-primarygtext text-primarygtext'}`} onClick={handleClick}>
        {text}
      </div>
    </div>
  )
}

export default FilterMeal