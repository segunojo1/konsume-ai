import { BlogProps } from '@/@types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({title, category }: BlogProps) => {
    const capitalizeFirstLetter = (str: string | undefined): string | undefined => {
        if (!str) return str; // Return the string as is if it's empty or undefined
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    return (
        <div className='flex flex-col items-start gap-4 py-6 px-3 shadow-sm rounded-[34px] hover:shadow-lg lg:w-full w-fit mx-auto'>
            <div
                className="justify-between flex flex-col min-h-[130px] bg-primary-bg px-3 pt-3 relative -z-10 rounded-lg w-full "
            >
                <Image src={`/${category}.svg`} width={39} height={32} alt='expand' className='absolute -top-4 -left-4' />
                <div className="flex justify-between">
                    <p className="text-secondary-500 font-bold text-mobile-caption ">{capitalizeFirstLetter(category)}</p>
                </div>
                <div className="flex justify-between flex-col mb-14">
                    <p className="text-primarygtext font-bold text-[15px]">{title}</p>
                    {/* <p className="text-color8-700 font-medium text-[11.2px]">
                        Nutritious bean cake high in protein and fiber.
                    </p> */}
                </div>
            </div>
            <Link href={`/blogs/${encodeURIComponent(title as string)}`} passHref>
                <div className='flex gap-5 items-center'>
                    <Image src='/expand_meal.svg' width={39} height={32} alt='expand' className='hover:rotate-12 cursor-pointer' />
                    <p className='font-bold text-[14px]/[120%]'>Open Blog</p>
                </div>
            </Link>
        </div>
    )
}

export default BlogCard