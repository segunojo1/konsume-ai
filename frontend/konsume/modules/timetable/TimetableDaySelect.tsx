import React from 'react'
import DayCard from './DayCard';

const TimetableDaySelect = () => {
    const today = new Date();
  const daysArray = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    daysArray.push(nextDay);
  }
  return (
    <div className='flex items-center gap-3 justify-center'>
        {daysArray.map((day:any, index:number) => (
            <DayCard date={day} key={index}/>
        ))}
    </div>
  )
}

export default TimetableDaySelect