import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogIntroductoryCard = () => {
    return (
        <div className='md:max-w-[551px] mx-auto relative font-satoshi flex flex-col items-center gap-10 bg-color8-100 shadow pt-12 pb-[30px] px-6 rounded-[10px]'>
            <Image src='/blogimg.svg' alt='blg' height={50} width={200} className='absolute right-0 top-0 ' />
            <div className='flex items-center gap-2 relative w-fit font-bold   '>
                <h1 className='md:text-desktop-heading4  text-mobile-heading1'> Here&apos;s</h1>
                <div className=' '>
                    <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[134px] w-[134.16px] absolute 2xl:top-5 xl:top-1 right-[0] z-0' />
                    <h1 className=' md:text-desktop-heading4  text-mobile-heading1 relative z-50'>what&apos;s up</h1>
                </div>
            </div>
            <p className='text-desktop-content'><b>Curated Content:</b> We&apos;ve uploaded a selection of blogs that match your specific needs, whether you’re aiming to boost nutrition, achieve fitness goals, or explore new meals. Dive into these handpicked articles and discover insights that resonate with your journey.</p>
            <p className='text-desktop-content'><b>Personalized AI Blogs:</b> Looking for something specific? Our AI-powered feature lets you generate nutrition-based blogs tailored to your interests. Simply input your topic, whether it's nutrition, meals, or goals, and let our AI create a custom article for you!</p>
            <p className='text-desktop-content'><b>Reading Streaks:</b> Stay consistent and get rewarded! Keep your reading streak alive by exploring new blogs daily. Your streak grows with each read, offering rewards and recognition. Missing a day will decrease your streak, so stay engaged and keep learning!</p>
            <Link href='/blogs'>
            <Button
                type="submit"
                className=" flex items-center justify-center mx-auto p-2 w-full md:w-[400px] h-[2.9rem] text-primary-bg-100 bg-primarygtext"

            >
                Let&apos;s Get Started
            </Button>
            
            </Link>
        </div>
    )
}

export default BlogIntroductoryCard