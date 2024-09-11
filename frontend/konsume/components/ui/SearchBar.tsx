import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Input } from './input'
import { useRouter } from 'next/router';
import MealsContext from '@/context/MealsContext';
import DashboardContext from '@/context/DashboardContext';

interface SearchbarProps {
    placeholder?: string;
    img?: string;
  }

const SearchBar = (
    {placeholder, img}:SearchbarProps
) => {
    const [searchQuery, setSearchQuery] = useState('');
    const {showInput, setShowInput} = useContext(DashboardContext);
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchQuery.trim()) {
            // Navigate to the search result page
            router.push(`/meals/${searchQuery.trim()}`);
        }
    };
    return (
        <div className='relative h-fit w-fit flex flex-col self-start justify-end'>
            <Image src={img ? img : '/searchplaceholder.svg'} alt='search' height={22} width={22} className={`md:absolute bottom-0 top-0 left-5 my-auto`} onClick={() => setShowInput(!showInput)}/>
            <Input 
            type='text'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`${showInput ? 'block' : 'hidden'} md:block bg-base-white text-desktop-content border-[1.5px] rounded-[10px] border-[#030a0088] pl-16 pr-5 md:min-w-[419px] w-full `}
            placeholder={placeholder ? placeholder : 'Search for Meals, Snacks and Drinks'} />
        </div>
    )
}

export default SearchBar