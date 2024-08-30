import React, { useContext, useEffect } from 'react'
import TimetableGreeting from './TimetableGreeting'
import TimetableCalender from './TimetableCalender'
import SpotlightedMealCard from '../dashboard/body/SpotlightedMealCard'
import DashboardContext from '@/context/DashboardContext'
import MealNutritionalInfo from '../MealNutritionalInfo'
import { useTimetableContext } from '@/context/TimetableContext'

const TimetableSidebar = () => {
  const { breakfast, loading, getRandomMeals } = useContext(DashboardContext);
  const {showSidebar, setShowSidebar} = useTimetableContext();
  useEffect(() => {
    getRandomMeals();
  }, [])
  return (
    <div className='w-fit flex flex-col gap-4 transition-all'>
      <TimetableGreeting />
      <TimetableCalender />
      <SpotlightedMealCard meal={breakfast} loading={loading} />
      <div className='p-5 rounded-2xl bg-primary-bg w-full'>
        <MealNutritionalInfo />
      </div>
    </div>
  )
}

export default TimetableSidebar