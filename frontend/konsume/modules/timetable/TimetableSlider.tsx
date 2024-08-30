import React from 'react'

const TimetableSlider = () => {
  return (
    <div className='px-6 py-2 bg-primary-bg flex items-center gap-10 rounded-2xl w-fit mx-auto text-[16px]/[120%] font-medium font-satoshi mb-10'>
        <div className='px-6 bg-base-white rounded-[10px]  py-2'>Month</div>
        <div className='px-6 bg-base-white rounded-[10px]  py-2'>Day</div>
        <div className='px-6 bg-base-white rounded-[10px]  py-2'>Week</div>
    </div>
  )
}

export default TimetableSlider