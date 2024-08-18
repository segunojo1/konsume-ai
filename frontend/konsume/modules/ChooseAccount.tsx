import Image from 'next/image'
import React from 'react'

const ChooseAccount = ({title, text}: any) => {
  return (
    <div className='flex gap-2 items-start'>
        <Image src='/icon1.svg' alt='icon1' width={23} height={23}/>
        <p className='text-desktop-content'><b>{title}:</b> {text}</p>
    </div>
  )
}

export default ChooseAccount