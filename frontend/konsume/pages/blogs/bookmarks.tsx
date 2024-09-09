import { BlogProps } from '@/@types'
import MainLayout from '@/components/Layout/MainLayout'
import { Button } from '@/components/ui/button'
import BlogContext from '@/context/BlogContext'
import BlogCard from '@/modules/blog/BlogCard'
import BlogHead from '@/modules/blog/BlogHead'
import FilterBlog from '@/modules/blog/FilterBlog'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Bookmarks = () => {
    const { bookmarkedBlogs, tempBookmarks, setTempBookmarks, setActiveBlog, activeBlog } = useContext(BlogContext);
    const handleBlogChange = (blog: string) => {
        setActiveBlog(blog);
    };
    return (
        <MainLayout topBarIcon='blog' topBarText='Bookmarked Blogs' fixedTopbar={true} className=' '>
            <div className='  gap-5 mb-6 font-satoshi'>
                <BlogHead />
                <div className='flex items-center my-4 gap-3 justify-center h-fit'>
                    {['All', 'Nutrition', 'Meals', 'Fitness', 'Others'].map((blog) => (
                        <FilterBlog
                            key={blog}
                            text={blog}
                            src={`/${blog.toLowerCase()}.svg`}
                            isActive={activeBlog === blog}
                            onChangeBlog={handleBlogChange}
                            mainValue={bookmarkedBlogs}
                            setTempValue={setTempBookmarks}
                        />
                    ))}
                </div>
                <div className='flex  justify-between mt-3'>
                    <Button className='bg-primarygtext self-end flex px-3 py-2 gap-3'>
                        <Image alt='logo' width={27.6} height={27.6} src='/icon6.svg' />
                        <p className='text-primary-bg text-desktop-content font-bold'>View Reading Streak</p>
                    </Button>
                    <Link href='/blogs'>
                        <Button className='border-2 border-[#0C2503] self-end flex px-3 py-2 gap-3 rounded-lg'>
                            <Image alt='logo' width={27.6} height={27.6} src='/timetablelogo.svg' />
                            <p className='text-primarygtext text-desktop-content font-bold'>Back to Blogs</p>
                        </Button>
                    </Link>
                </div>
                {tempBookmarks.length > 0 ? (
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mt-6 mx-auto lg:mx-0 w-fit lg:w-full'>
                        {
                            tempBookmarks?.map((blog: BlogProps) => (
                                <BlogCard key={blog.id} title={blog.title} text={blog.text} category={blog.category} />
                            ))
                        }
                    </div>
                ) : (
                    <p className='mx-auto w-fit'>Ouch, no blogs to show.😥</p>
                )
                }
            </div>
        </MainLayout>
    )
}

export default Bookmarks