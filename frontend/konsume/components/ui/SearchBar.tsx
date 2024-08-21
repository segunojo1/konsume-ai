import Image from 'next/image'
import React from 'react'
import { Input } from './input'

const SearchBar = () => {
    return (
        <div className='relative h-fit w-fit  self-start justify-end'>
            <Image src='/searchplaceholder.svg' alt='search' height={22} width={22} className='absolute bottom-0 top-0 left-5 my-auto' />
            <Input className=' bg-base-white text-desktop-content border-[1.5px] rounded-[10px] border-[#030a0088] pl-16 pr-5 md:min-w-[419px] w-full ' placeholder='Search for Meals, Snacks and Drinks' />
        </div>
    )
}

export default SearchBar