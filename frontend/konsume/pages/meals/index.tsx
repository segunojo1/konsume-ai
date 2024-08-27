import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/ui/SearchBar';
import MainLayoutContext from '@/context/LayoutContext';
import gemini from '@/http/gemini';
import FilterMeal from '@/modules/meals/FilterMeal';
import MealCard from '@/modules/meals/MealCard';
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { axiosKonsumeInstance } from '@/http/konsume';
import MealsContext from '@/context/MealsContext';
import { Mealprops } from '@/@types';

const Meals = () => {
  const { name, toggled }: any = useContext(MainLayoutContext);
  const [fetchingMeals, setFetchingMeals] = useState(false)
  const [activeMeal, setActiveMeal] = useState<string>('All');
  const {recommendedMeals, setRecommendedMeals} = useContext(MealsContext);

  const getMeals = async () => {
    try {
      const { data } = await axiosKonsumeInstance.get('/api/ChatBot/GenerateMeals', {
        params: {
          profileId: 7,
        },
      });
      setRecommendedMeals(data.$values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleMealChange = (meal: string) => {
    setActiveMeal(meal);
  };
  
  const [user, setUser] = useState<string | undefined>();
  const dataFetchedRef = useRef(false); // Ref to track if data has been fetched
  
  useEffect(() => {
    setUser(Cookies.get('konsumeUsername'));
  
    if (!dataFetchedRef.current) {
      getMeals();
      dataFetchedRef.current = true; // Set to true after fetching data
    }
  }, []);
  

  return (
    <div>
      <MainLayout fixedTopbar={true} topBarText='Search with AI' topBarIcon='search' includeMarginTop={true}>
        <div className='flex justify-between w-full font-satoshi'>

          <div className="flex flex-col gap-7">

            <div className="relative w-fit">
              <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='  absolute bottom-0 top-0 my-auto right-0 -z-50' />
              <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {user ? user : ".."}</h1>
            </div>
            <p className=" text-desktop-content text-primarygtext italic max-w-[450px]">Here are your personalized meal recommendations, tailored just for you based on your health, dietary goals and preferences. <b>Bon Appétit!</b></p>
          </div>

          <SearchBar />
        </div>
        <div className='flex justify-between mt-10'>
          <Button className='bg-primarygtext  flex px-3 py-2 gap-3  '>
            <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg'/><p className=' text-primary-bg text-desktop-content font-bold font-satoshi'>Set up My Timetable</p>
          </Button>

          <div className='flex items-center gap-3'>
            <FilterMeal text='All' isActive={activeMeal === 'All'}
        onChangeMeal={handleMealChange}/>
            <FilterMeal text='Breakfast' src='/breakfast.svg' isActive={activeMeal === 'Breakfast'}
        onChangeMeal={handleMealChange}/>
            <FilterMeal text='Lunch' src='/lunch.svg' isActive={activeMeal === 'Lunch'}
        onChangeMeal={handleMealChange}/>
            <FilterMeal text='Dinner' src='/dinner.svg' isActive={activeMeal === 'Dinner'}
        onChangeMeal={handleMealChange}/>
        <FilterMeal text='Snack' src='/snack.svg' isActive={activeMeal === 'Snack'}
        onChangeMeal={handleMealChange}/>
          </div>
          <Button className='border-2 border-[#0C2503] flex px-3 py-2 gap-3 rounded-lg  '>
            <Image alt='logo' width={27.6} height={27.6} src='/icon4.svg'/><p className=' text-primarygtext text-desktop-content font-bold font-satoshi'>Check out Resturants</p>
          </Button>
        </div>

        <div className='flex justify-between items-center'>
          <h1 className='text-desktop-content font-bold font-satoshi mt-10 mb-[30px]'>Suggested Meals for you</h1>
          <div className='flex cursor-pointer'>
            <div className='flex p-[10px] border-[0.7px] border-primarygtext rounded-l rounded-r-[2px]'>
              <Image alt='left' width={3.5} height={7} src='/leftarrow.svg'/>
            </div>
            <div className=' flex p-[10px] border-[0.7px] border-primarygtext rounded-r rounded-l-[2px]'>
              <Image alt='right' width={3.5} height={7} src='/arrowright.svg'/>
            </div>
          </div>

        </div>
        <div className='grid grid-cols-4 gap-4'>
          {
            setRecommendedMeals && recommendedMeals.map((meal: Mealprops) => (
              <MealCard query={``} meal={meal}/>
            ))
          }
          
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eat for breakfast. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eat for dinner. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eat for lunch. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eat for a snack. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eatas brunch. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
          <MealCard query={`Generate the name of a random meal a ${Cookies.get('diet')} can eat for dinner. meal name must be short i have ${Cookies.get('possibleDiseases')} and i want to ${Cookies.get('userGoal')}e.g jollof rice `} />
        </div>

      </MainLayout>
    </div>
  )
}

export default Meals