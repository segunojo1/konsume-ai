import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/ui/SearchBar';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import MealsContext from '@/context/MealsContext';
import { Mealprops } from '@/@types';
import Link from 'next/link';
import { motion } from "framer-motion";

import { DashboardBlogSkeleton } from '@/components/skeleton-loaders/DashboardBlogSkeleton';
import BlogContext from '@/context/BlogContext';
import { useUserContext } from '@/context/UserContext';
import withAuth from '@/helpers/withAuth';

const Meals: React.FC = () => {
  const [activeMeal, setActiveMeal] = useState<string>('All');
  const [open, setOpen] = useState(true);
  const { tempMeals, loadingMeal }: any = useContext(MealsContext);

  const {username} = useUserContext();
const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
useEffect(() => {
  
  setFirstName(username?.split(" ")[0] ?? "");
}, [username]);

  const handleMealChange = (meal: string) => {
    setActiveMeal(meal);
  };
  const showFullMeals = () => {
    setOpen(!open);
  }

  return (
    <MainLayout fixedTopbar={true} topBarText='Search with AI' topBarIcon='search' includeMarginTop={true} className='flex-col'>
      <motion.aside
        className=" space-y-11 h-[160px] overflow-hidden "
        animate={{
          height: open ? "160px" : "30px",
          display: open ? "block" : "none",
        }}
      >
        <div className='flex justify-between w-full font-satoshi'>
          <div className="flex flex-col gap-7">
            <div className="relative w-fit">
              <Image src='/multi-line.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 -z-50' />
              <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {firstName ? firstName : '...' }</h1>
            </div>
            <p className="text-desktop-content text-primarygtext italic max-w-[450px]">
              Here are your personalized meal recommendations, tailored just for you based on your health, dietary goals and preferences. <b>Bon Appétit!</b>
            </p>
          </div>
          <SearchBar />
        </div>
      </motion.aside>
      <div className='md:flex justify-between mt-10 hidden font-satoshi'>
        <Button className='bg-primarygtext flex px-3 py-2 gap-3'>
          <Image alt='logo' width={27.6} height={27.6} src='/time-table.svg' />
          <p className='text-primary-bg text-desktop-content font-bold xl:block hidden'>Set up My Timetable</p>
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
          <Image alt='logo' width={27.6} height={27.6} src='/icon4.svg' />
          <p className='text-primarygtext text-desktop-content font-bold xl:block hidden'>Check out Restaurants</p>
        </Button>
      </div>
      <div className='flex flex-col md:hidden font-satoshi '>

        <div className='flex items-center my-4 gap-3 justify-center h-fit md:order-1 order-2'>
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
        <div className='flex  justify-between mt-3'>
          {/* <motion.aside
      className=" overflow-hidden "
      animate={{
        width: open ? "100%" : "50px"
      }}
      > */}
          <Button className='bg-primarygtext self-end flex px-3 py-2 gap-3 font-satoshi'>
            <Image alt='logo' width={27.6} height={27.6} src="/time-table.svg" />
            <motion.aside
              className=" overflow-hidden "
              animate={{
                width: open ? "159px" : "10px",
                display: open ? "block" : "none",
              }}
            >
              <p className={`text-primary-bg text-desktop-content font-bold `}>Set up My Timetable</p>
            </motion.aside>
          </Button>
          {/* </motion.aside> */}
          {open ? (

          <Link href='/blogs/bookmarks'>
            <Image alt='restaurant' width={27.6} height={27.6} src='/restaurant.svg' className='' />
          </Link>
          ) : (
            <SearchBar />
          )}
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <h1 className='text-desktop-content font-bold mt-10 mb-[30px] font-satoshi'>Suggested Meals for you</h1>
        <div className='flex cursor-pointer'>
          {/* <div className='flex p-[10px] border-[0.7px] border-primarygtext rounded-l rounded-r-[2px]'>
            <Image alt='left' width={3.5} height={7} src='/leftarrow.svg' />
          </div>
          <div className='flex p-[10px] border-[0.7px] border-primarygtext rounded-r rounded-l-[2px]'>
            <Image alt='right' width={3.5} height={7} src='/arrowright.svg' />
          </div> */}
          <Button className={`${open ? '' : 'rotate-180'}`}>
            <Image alt='left' width={26} height={33} src='/turnarrow.svg' onClick={showFullMeals} />
          </Button>
        </div>
      </div>
      {/* {
  tempMeals.length > 0 ? ( */}
      {loadingMeal ? (
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mt-6 mx-auto lg:mx-0 w-fit lg:w-full'>
          <DashboardBlogSkeleton />
          <DashboardBlogSkeleton />
          <DashboardBlogSkeleton />
          <DashboardBlogSkeleton />
        </div>) :
        (<div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mx-auto lg:mx-0 '>
          {tempMeals?.map((meal: Mealprops) => (
            <MealCard key={meal.name} meal={meal} />
          ))}
        </div>
        )
      }
      {/* // ) : (
  //   <div>
  //     <h1>No meals to show for now.</h1>
  //   </div>
  // ) */}
      {/* } */}
    </MainLayout>
  );
};

export default withAuth(Meals);
