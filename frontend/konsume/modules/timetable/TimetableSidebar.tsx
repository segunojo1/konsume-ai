import React from 'react'
import TimetableGreeting from './TimetableGreeting'
import TimetableCalender from './TimetableCalender'

const TimetableSidebar = () => {
  return (
    <div>
        <TimetableGreeting />
        <TimetableCalender />
    </div>
  )
}

export default TimetableSidebar