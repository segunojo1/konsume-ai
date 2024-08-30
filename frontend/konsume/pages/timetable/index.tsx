import MainLayout from '@/components/Layout/MainLayout'
import TimetableMain from '@/modules/timetable/TimetableMain'
import TimetableSidebar from '@/modules/timetable/TimetableSidebar'
import React from 'react'

const Timetable = () => {
  return (
    <MainLayout topBarIcon='uil_calender' topBarText='Timetable' fixedTopbar={true} className=' '>
      <div className='flex w-full gap-5 '>
        <TimetableSidebar />
        <TimetableMain />
      </div>
    </MainLayout>
  )
}

export default Timetable