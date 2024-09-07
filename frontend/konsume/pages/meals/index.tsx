import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import { axiosKonsumeInstance } from '@/http/konsume';
import MealsContext from '@/context/MealsContext';
import MainLayoutContext from '@/context/LayoutContext';
import { Mealprops } from '@/@types';
import { retry } from '@/helpers/retryapi';

const Meals: React.FC = () => {
  const [activeMeal, setActiveMeal] = useState<string>('All');
  const {setRecommendedMeals, recommendedMeals, user,tempMeals, setTempMeals }:any = useContext(MealsContext);
  
  // useEffect(() => {
  //  if (!localStorage.getItem('recommendedMeals')) {
  //    setRecommendedMeals([]);
  //  }
  // }, [])

  const handleMealChange = (meal: string) => {
    setActiveMeal(meal);
  };

  return (
    <MainLayout fixedTopbar={true} topBarText='Search with AI' topBarIcon='search' includeMarginTop={true} className='flex-col h-screen'>
      <div className='flex justify-between w-full font-satoshi'>
        <div className="flex flex-col gap-7">
          <div className="relative w-fit">
            <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 -z-50' />
            <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {user ? user : ".." }</h1>
          </div>
          <p className="text-desktop-content text-primarygtext italic max-w-[450px]">
            Here are your personalized meal recommendations, tailored just for you based on your health, dietary goals and preferences. <b>Bon Appétit!</b>
          </p>
        </div>
        <SearchBar />
      </div>

      <div className='flex justify-between mt-10'>
        <Button className='bg-primarygtext flex px-3 py-2 gap-3'>
          <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg'/>
          <p className='text-primary-bg text-desktop-content font-bold'>Set up My Timetable</p>
        </Button>
        <div className='flex items-center gap-3'>
          {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal) => (
            <FilterMeal 
              key={meal}
              text={meal} 
              src={`/${meal.toLowerCase()}.svg`} 
              isActive={activeMeal === meal}
              onChangeMeal={handleMealChange}
            />
          ))}
        </div>
        <Button className='border-2 border-[#0C2503] flex px-3 py-2 gap-3 rounded-lg'>
          <Image alt='logo' width={27.6} height={27.6} src='/icon4.svg'/>
          <p className='text-primarygtext text-desktop-content font-bold'>Check out Restaurants</p>
        </Button>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-desktop-content font-bold mt-10 mb-[30px]'>Suggested Meals for you</h1>
        <div className='flex cursor-pointer'>
          <div className='flex p-[10px] border-[0.7px] border-primarygtext rounded-l rounded-r-[2px]'>
            <Image alt='left' width={3.5} height={7} src='/leftarrow.svg'/>
          </div>
          <div className='flex p-[10px] border-[0.7px] border-primarygtext rounded-r rounded-l-[2px]'>
            <Image alt='right' width={3.5} height={7} src='/arrowright.svg'/>
          </div>
        </div>
      </div>
{/* {
  tempMeals.length > 0 ? ( */}

      <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mx-auto lg:mx-0 '>
        {tempMeals?.map((meal: Mealprops) => (
          <MealCard key={meal.name} query="" meal={meal} />
        ))}
      </div>
  {/* // ) : (
  //   <div>
  //     <h1>No meals to show for now.</h1>
  //   </div>
  // ) */}
{/* } */}
    </MainLayout>
  );
};

export default Meals;
