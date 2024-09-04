import React from 'react'

const DayCard = ({date}: {date: Date}) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // 'Monday', 'Tuesday', etc.
    const dayNumber = String(date.getDate()).padStart(2, '0');
      const monthName = date.toLocaleDateString('en-US', { month: 'short' }); // 'Jan', 'Feb', etc.
  return (
    <div className='font-satoshi flex flex-col items-center justify-between px-[19px] md:min-w-[103px] py-[9px] rounded-lg bg-secondary-100 cursor-pointer'>
        <p className=' font-bold text-[13.86px]/[120%] '>{dayName}</p>
        <p className='font-bold text-[24.95px]/[120%]'>{dayNumber}</p>
    </div>
  )
}

export default DayCard