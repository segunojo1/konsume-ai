import { Button } from '@/components/ui/button'
import SearchBlog from '@/components/ui/SearchBlog'
import BlogContext from '@/context/BlogContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import GenerateBlogModal from './GenerateBlogModal'

const BlogHead = () => {
    const {name} = useContext(BlogContext);
    const router = useRouter();
    const {showModal, setShowModal} = useContext(BlogContext);
  return (
    <div>
        <div className='flex justify-between w-full font-satoshi'>
        <div className="flex flex-col gap-7">
          <div className="relative w-fit">
            <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 z-0' />
            <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {name || ".."}</h1>
          </div>
          <p className="text-desktop-content text-primarygtext italic max-w-[388px]">
          We've curated some blogs just for you, tailored to your goals and preferences.  Dive in to explore articles that match your needs, or feel free to <b>generate any nutrition-based blog using our AI!</b>          
          </p>
        </div>
        <Button className='flex items-center border rounded' onClick={() => setShowModal(true)}>
          Generate Blog with AI
          <Image src="/ai.svg" className='' width={23} height={40} alt=''/>
        </Button>
        {showModal && <GenerateBlogModal />}
        
      </div>
    </div>
  )
}

export default BlogHead