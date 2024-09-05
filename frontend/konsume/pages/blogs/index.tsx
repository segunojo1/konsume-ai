import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button'
import BlogHead from '@/modules/blog/BlogHead'
import FilterBlog from '@/modules/blog/FilterBlog'
import BlogIntroductoryCard from '@/modules/blog/onboard/BlogIntroductoryCard'
import BlogOnboardHead from '@/modules/blog/onboard/BlogOnboardHead'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { BlogItems } from './blogitems'
import BlogCard from '@/modules/blog/BlogCard'
import BlogContext from '@/context/BlogContext'
import { BlogProps } from '@/@types'

const Blogs = () => {
    const [activeBlog, setActiveBlog] = useState<string>('All');
    const {tempBlogs} = useContext(BlogContext);
    // useEffect(() => {
    //  if (!localStorage.getItem('recommendedMeals')) {
    //    setRecommendedMeals([]);
    //  }
    // }, [])

    const handleBlogChange = (meal: string) => {
        setActiveBlog(meal);
    };
    return (
        <MainLayout topBarIcon='blog' topBarText='Blogs' fixedTopbar={true} className=' '>
            <div className='  gap-5 mb-6 font-satoshi'>
                <BlogHead />
                <div className='flex justify-start mt-10'>
                    <Button className='bg-primarygtext flex px-3 py-2 gap-3'>
                        <Image alt='logo' width={27.6} height={27.6} src='/icon6.svg' />
                        <p className='text-primary-bg text-desktop-content font-bold'>View Reading Streak</p>
                    </Button>
                    <div className='flex items-center gap-3'>
                        {['All', 'Nutrition', 'Meals', 'Fitness', 'Others'].map((blog) => (
                            <FilterBlog
                                key={blog}
                                text={blog}
                                src={`/${blog.toLowerCase()}.svg`}
                                isActive={activeBlog === blog}
                                onChangeMeal={handleBlogChange}
                            />
                        ))}
                    </div>
                    {/* <Button className='border-2 border-[#0C2503] flex px-3 py-2 gap-3 rounded-lg'>
                        <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg' />
                        <p className='text-primarygtext text-desktop-content font-bold'>View Bookmarked blogs</p>
                    </Button> */}
                </div>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mt-6 mx-auto lg:mx-0 w-fit lg:w-full'>
                    {tempBlogs?.map((blog: BlogProps) => (
                        <BlogCard key={blog.id} id={blog.id} title={blog.title} text={blog.text} />
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default Blogs