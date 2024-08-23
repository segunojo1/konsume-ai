import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/ui/SearchBar';
import MainLayoutContext from '@/context/LayoutContext';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import MealInfo from '@/modules/meals/MealInfo';
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const Meal = () => {
  const { name, toggled }: any = useContext(MainLayoutContext);

  const [activeMeal, setActiveMeal] = useState<string>('All');

  const handleMealChange = (meal: string) => {
    setActiveMeal(meal);
  };
  return (
    <div>
      <MainLayout fixedTopbar={true} topBarText='Eat with AI' topBarIcon='logo2' includeMarginTop={true}>
        <div className='flex justify-between w-full font-satoshi'>

          <div className="flex flex-col gap-7">

            <div className="relative w-fit">
              <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='  absolute bottom-0 top-0 my-auto left-11 -z-50' />
              <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Moimoi, A nutritious Beans Cake </h1>
            </div>
            <p className=" text-desktop-content text-primarygtext italic max-w-[450px]">A healthy, protein-rich Nigerian delicacy perfect for breakfast. <b>Bon Appétit!</b></p>
            <div className='flex items-center gap-2'>

            <p className=' text-desktop-highlight font-medium'>Calories per serving: 350 kcal </p><Image src="/breakfast.svg" alt='' width={27.6} height={27.6}/>
            </div>
          </div>

          <div className="gap-2 flex flex-col md:min-w-[303px] font-bold">
              <div className="justify-between flex bg-primary-bg-400 p-3 rounded-lg">
                <p className="">Protein</p>
                <p className="text-[#FFC501]">
                  30-40%
                </p>
              </div>
              <div className="justify-between flex bg-secondary-100 p-3 rounded-lg">
                <p className=" ">Carbohydrates</p>
                <p className=" text-[#FFC501]">
                  30-40
                </p>
              </div>
              <div className="justify-between flex bg-primary-bg-main p-3 rounded-lg">
                <p className="">Healthy Fats</p>
                <p className=" text-[#FFC501]">40-50</p>
              </div>
            </div>
        </div>
        <div className='flex gap-20 items-center mt-10 mb-16'>
          <Button className='bg-primarygtext  flex px-3 py-2 gap-3  '>
            <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg'/><p className=' text-primary-bg text-desktop-content font-bold font-satoshi'>Add to My Timetable</p>
          </Button>

          <SearchBar />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <MealInfo />
          <MealInfo />
          <MealInfo /> 
        </div>

      </MainLayout>
    </div>
  )
}

export default Meal