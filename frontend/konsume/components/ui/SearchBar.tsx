import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { Input } from './input'
import { useRouter } from 'next/router';
import MealsContext from '@/context/MealsContext';
import DashboardContext from '@/context/DashboardContext';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface SearchbarProps {
    placeholder?: string;
    img?: string;
}

const SearchBar = (
    { placeholder, img }: SearchbarProps
) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { showInput, setShowInput } = useContext(DashboardContext);
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
        <div className='relative h-fit md:w-fit w-[34px] flex flex-col justify-end'>
            <Image src={img ? img : '/searchplaceholder.svg'} alt='search' height={22} width={22} className={`md:flex hidden bottom-0 top-0 absolute left-5 my-auto`} onClick={() => setShowInput(!showInput)} />
            <Input
                type='text'
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`hidden md:block bg-base-white text-desktop-content border-[1.5px] rounded-[10px] border-[#030a0088] pl-16 pr-5 md:min-w-[419px] w-full `}
                placeholder={placeholder ? placeholder : 'Search for Meals, Snacks and Drinks'} />
            <Dialog>
                <DialogTrigger asChild className='font-satoshi backdrop-blur-md md:hidden block'>
                    <Image src={img ? img : '/searchplaceholder.svg'} alt='search' height={34} width={34} className={`animate-pulse md:hidden bottom-0 top-0 left-5 my-auto w-[34px]`} onClick={() => setShowInput(!showInput)} />

                </DialogTrigger>
                <DialogContent className="  px-4 py-6">
                    <DialogHeader>
                        <div className='relative w-fit mx-auto'>
                            <Image
                                src="/curved_line.svg"
                                alt="curved line"
                                height={100}
                                width={150}
                                className="absolute left-0 -z-10 w-[100px] bottom-0"
                            />
                            <h1 className='text-mobile-heading3 font-bold z-50 font-satoshi  '>Search meal with AI</h1>
                        </div>
                    </DialogHeader>
                    <Input
                        type='text'
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={`bg-base-white text-mobile-content py-3 border-[1.5px] rounded-[10px] h-fit border-[#030a0088]  px-3 w-full `}
                        placeholder={placeholder ? placeholder : 'Search for Meals, Snacks and Drinks'} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SearchBar