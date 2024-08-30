import MainLayout from '@/components/Layout/MainLayout'
import TimetableSidebar from '@/modules/timetable/TimetableSidebar'
import React from 'react'

const Timetable = () => {
  return (
    <div>
        <MainLayout topBarIcon='uil_calender' topBarText='Timetable' fixedTopbar={true}>
            <TimetableSidebar />
        </MainLayout>
    </div>
  )
}

export default Timetable