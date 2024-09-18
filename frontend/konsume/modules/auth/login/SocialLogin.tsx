import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const SocialLogin = () => {
  return (
    <div className="flex flex-col justify-between gap-4 mt-4">
    <p className='text-desktop-highlight font-bold mx-auto'>Or</p>
    <Button className="mx-auto p-[10px] flex-[.7] border-2 md:w-[350px] w-full border-primary-bg-800 text-primarygtext rounded-[30px] flex items-center gap-[10px] text-desktop-highlight font-bold">
      <Image src="/assets/google.png" width={32} height={32} alt='google' />
      Sign in with Google
    </Button>
  </div>
  )
}

export default SocialLogin