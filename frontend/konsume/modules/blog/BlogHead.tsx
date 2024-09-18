import { Button } from '@/components/ui/button'
import SearchBlog from '@/components/ui/SearchBlog'
import BlogContext from '@/context/BlogContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import GenerateBlogModal from './GenerateBlogModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserContext } from '@/context/UserContext'

const BlogHead = () => {
  const {username} = useUserContext();
const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
useEffect(() => {
  
  setFirstName(username?.split(" ")[0] ?? "");
}, [username]);
  return (
    <div>
      <div className='flex justify-between w-full font-satoshi'>
        <div className="flex flex-col gap-7">
          <div className="relative w-fit">
            <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='md:w-[98px] w-[60px] absolute bottom-0 top-0 my-auto right-0 z-0' />
            <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {firstName ? firstName : '...' }</h1>
          </div>
          <p className="text-desktop-content text-primarygtext italic max-w-[388px]">
            We've curated some blogs just for you, tailored to your goals and preferences.  Dive in to explore articles that match your needs, or feel free to <b>generate any nutrition-based blog using our AI!</b>
          </p>
        </div>
        {/* <Button className='flex items-center border rounded' onClick={() => setShowModal(true)}>
          Generate Blog with AI
          <Image src="/ai.svg" className='' width={23} height={40} alt='' />
        </Button> */}
        <Dialog>
          <DialogTrigger asChild className='font-satoshi backdrop-blur-md'>
            <div>
            <Button variant="outline" className='md:flex hidden'>
              <h1 className=''>Generate Blog with AI</h1>
              <Image src="/ai.svg" className='' width={23} height={40} alt='' />
            </Button>
            <div className='md:hidden animate-pulse cursor-pointer'>
            <Image src="/searchai.svg" className='' width={40} height={40} alt='' />
            </div>
            </div>
          </DialogTrigger>
          <DialogContent className="md:min-w-[550px] md:p-10 py-6 w-[95%] mx-auto">
            <DialogHeader>
              <div className='relative w-fit'>
                <Image
                  src="/curved_line.svg"
                  alt="curved line"
                  height={100}
                  width={150}
                  className="absolute left-0 -z-10 w-[150px] bottom-0"
                />
                <h1 className='text-desktop-heading4 font-bold z-50 font-satoshi '>Generate with AI</h1>
              </div>
            </DialogHeader>
            <GenerateBlogModal />
          </DialogContent>
        </Dialog>
        {/* {showModal && <GenerateBlogModal />} */}

      </div>
    </div>
  )
}

export default BlogHead