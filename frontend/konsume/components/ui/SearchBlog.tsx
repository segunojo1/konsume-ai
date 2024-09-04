import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from './input'
import { useRouter } from 'next/router';

const SearchBlog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter' && searchQuery.trim()) {
    //         // Navigate to the search result page
    //         router.push(`/meals/${searchQuery.trim()}`);
    //     }
    // };
    return (
        <div className='relative h-fit w-fit  self-start justify-end'>
            <Image src='/blogplaceholder.svg' alt='search' height={40} width={40} className='absolute bottom-0 top-0 left-5 my-auto' />
            <Input 
            type='text'
            value={searchQuery}
            onChange={handleInputChange}
            className=' bg-base-white text-desktop-content border-[1.5px] rounded-[10px] border-[#030a0088] pl-16 pr-5 md:min-w-[464px] w-full ' 
            placeholder="What do you want to read? Generate with AI" />
        </div>
    )
}

export default SearchBlog