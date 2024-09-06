import { BlogProps } from '@/@types'
import Image from 'next/image'
import React from 'react'

const MainBlogText = ({text}: BlogProps) => {
    const formatText = (etxt: string) => {
        const sections = etxt.split('\n\n');
        return sections.map((section, index) => {
            const [heading, ...rest] = section.split(':');
            if (index === 0) return <p key={index}>{section}</p>;
            return (
                <React.Fragment key={index}>
                    <h1 className='text-secondary-500 font-bold text-desktop-feature'>{heading}</h1>
                    <p>{rest.join(':')}</p>
                </React.Fragment>
            );
        });
    };
    return (
        <div className='flex flex-col gap-16 bg-color8-100 rounded-[10px] py-5 px-14 max-w-[900px] mx-auto'>
            <div className='flex justify-between '>
                <div className='flex flex-col items-center justify-between'>
                    <div className='flex gap-3 items-center'>
                        <Image
                            src="/meals.svg"
                            alt="meal"
                            height={30}
                            width={30}
                            className=""
                        />
                        <p className='text-[18px]/[120%] font-bold'>By Foodie</p>
                    </div>
                    <p className='text-desktop-content'>3rd, Aug. 2024</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Image
                        src="/bookmark.svg"
                        alt="bookmark"
                        height={30}
                        width={22}
                        className=""
                    />
                    <Image
                        src="/share.svg"
                        alt="share"
                        height={25}
                        width={22}
                        className=""
                    />
                </div>
            </div>
            <div>
                <p className='flex flex-col'>{formatText(text)}</p>
            </div>
        </div>
    )
}

export default MainBlogText