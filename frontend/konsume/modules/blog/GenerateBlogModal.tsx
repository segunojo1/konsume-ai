import SearchBlog from '@/components/ui/SearchBlog'
import BlogContext from '@/context/BlogContext';
import Image from 'next/image'
import React, { useContext } from 'react'

const GenerateBlogModal = () => {
    const { setShowModal } = useContext(BlogContext);

    return (
        // <div className='flex items-center justify-center mx-auto top-0 left-0 right-0 bottom-0 fixed backdrop-blur-md'>
            <div className=' flex flex-col z-[70] backdrop-blur-md rounded-[10px] shadow-sm relative font-satoshi'>
                {/* <div className='absolute right-6' onClick={() => setShowModal(false)}>
                    <Image
                        src="/close.svg"
                        alt="close"
                        height={30}
                        width={36}
                        className="cursor-pointer"
                    />
                </div> */}
                {/* <div className='relative w-fit'>
                    <Image
                        src="/curved_line.svg"
                        alt="curved line"
                        height={100}
                        width={150}
                        className=" absolute left-0 -z-10 w-[150px]"
                    />
                    <h1 className='text-desktop-heading4 font-bold z-50 '>Generate with AI</h1>
                </div> */}
                <p className='text-desktop-content font-normal my-8 '>Type in a keyword or phrase related to nutrition, meals, or goals. Our AI will generate a detailed blog based on your input.</p>
                <h1 className='font-medium text-[18px] mb-2'>What do you want to read?</h1>
                <SearchBlog />
            </div>
        // </div>
    )
}

export default GenerateBlogModal