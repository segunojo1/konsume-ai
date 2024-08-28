import MainLayout from '@/components/Layout/MainLayout'
import TimetableForm from '@/modules/setup-timetable/TimetableForm'
import TimetableHead from '@/modules/setup-timetable/TimetableHead'
import React from 'react'

const SetupTimetable = () => {

  return (
    <div className='bg-[#fafafa7f] font-satoshi'>
        <MainLayout fixedTopbar={true} topBarText='Timetable' topBarIcon='uil_calender'>
            <TimetableHead />
            <TimetableForm />
        </MainLayout>
    </div>
  )
}

export default SetupTimetable