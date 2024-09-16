import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Image from 'next/image';

const BlogOnboardHead = () => {
    const [user, setUser] = useState<string | undefined>();

    useEffect(() => {
        setUser(Cookies.get('konsumeUsername'))
    }, [])
    return (
        <div className="font-satoshi mb-9 ">
            <div className="flex flex-col gap-5 md:w-[488px]">
                <div className="relative w-fit">
                    <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='absolute bottom-0 top-0 my-auto right-0 z-50' />
                    <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-50">Hello, {user || ".."}</h1>
                </div>
                <p className=" text-desktop-caption text-primarygtext md:max-w-[355px] max-w-[330px]">
                Welcome to our blog hub! Here, explore articles tailored to your health goals and dietary preferences. Whether you’re snacking, enjoying a meal, or just browsing, we’ve got content to inform and inspire.
                </p>
            </div>
        </div>
    )
}

export default BlogOnboardHead