import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const TimetableGreeting = () => {
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    setUser(Cookies.get('konsumeUsername'))
  }, [])
  return (
    <div className="font-satoshi mb-9 relative">
      <div className="relative w-fit">
        <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 z-50' />
        <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {user || ".."}</h1>
      </div>
      <Image src='/bx_dock-left.svg' alt='multi line' height={30} width={30} className='absolute right-0 cursor-pointer' />
    </div>
  )
}

export default TimetableGreeting