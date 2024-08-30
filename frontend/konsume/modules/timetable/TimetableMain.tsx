import React from 'react'
import TimetableSlider from './TimetableSlider'
import TimetableDaySelect from './TimetableDaySelect'
import TimetableMeals from './TimetableMeals'

const TimetableMain = () => {
  return (
    <div className='w-full mx-auto '>
        <TimetableSlider />
        <TimetableDaySelect />
        <TimetableMeals />
    </div>
  )
}

export default TimetableMain