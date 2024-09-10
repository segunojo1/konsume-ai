"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DashboardQuickIcon = ({ img, text, link}: any) => {
    return (
        <Link href={`${link}`}>
            <div className='px-2 py-[5px] border-2 border-[#0C2503] bg-base-white flex gap-3 items-center w-fit rounded-lg'>
                <Image src={img} alt='icon' width={23} height={23} />
                <p className=' text-[11px]/[120%] font-bold'>{text}</p>
            </div>
        </Link>
    )
}

export default DashboardQuickIcon