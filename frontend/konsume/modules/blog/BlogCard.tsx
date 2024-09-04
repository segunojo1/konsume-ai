import Image from 'next/image'
import React from 'react'

const BlogCard = ({ blog}: any) => {
    return (
        <div className='flex flex-col items-start gap-4 py-6 px-3 shadow-sm rounded-[34px] hover:shadow-lg'>
            <div
                className="justify-between flex flex-col min-h-[130px] bg-primary-bg px-3 pt-3 relative rounded-lg "
            >
                <Image src={`${blog.category}.svg`} width={39} height={32} alt='expand' className='absolute -top-4 -right-4' />
                <div className="flex justify-between">
                    <p className="text-secondary-500 font-bold text-mobile-caption ">{blog.category}</p>
                </div>
                <div className="flex justify-between flex-col mb-14">
                    <p className="text-primarygtext font-bold text-[15px]">{blog.title}</p>
                    <p className="text-color8-700 font-medium text-[11.2px]">
                        Nutritious bean cake high in protein and fiber.
                    </p>
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <Image src='/expand_meal.svg' width={39} height={32} alt='expand' className='hover:rotate-12 cursor-pointer' />
                <p className='font-bold text-[14px]/[120%]'>Open Blog</p>
            </div>
        </div>
    )
}

export default BlogCard