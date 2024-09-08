import React, { useState } from 'react'
import Calendar from 'react-calendar';

const TimetableCalender = () => {
    const [date, setDate] = useState(new Date());
  return (
    <div className='app'>
      <div className='calendar-container font-satoshi'>
        <Calendar onChange={setDate} value={date} selectRange={true} />
      </div>
      {/* <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p> */}
    </div>
  )
}

export default TimetableCalender