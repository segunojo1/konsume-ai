// pages/blog/[title].tsx

import MainLayout from '@/components/Layout/MainLayout'
import MainBlogText from '@/modules/blog/mainBlogText'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const BlogDetail = () => {
    const router = useRouter()
    const { title } = router.query
    const [blog, setBlog] = useState<any>(null)

    useEffect(() => {
        if (title) {
            // Fetch the blog data based on the title (you could use an API or local data source)
            const blogs = JSON.parse(localStorage.getItem('blogs') || '[]'); // Fetching from localStorage for simplicity
            const selectedBlog = blogs.find((blog: any) => blog.title === title);

            if (selectedBlog) {
                setBlog(selectedBlog);
            }
        }
    }, [title])

    if (!blog) {
        return <p>Loading...</p>
    }

    return (
        <MainLayout topBarIcon='blog' topBarText='Blogs' fixedTopbar={true} className='relative '>
            <Image alt='logo' width={31} height={31} src='/backbtn.png' className='absolute' />
            <div className='font-satoshi mt-7' >
                <div className='flex justify-center gap-6'>
                    <div className='relative'>
                        <Image
                            src="/curved_line.svg"
                            alt="curved line"
                            height={500}
                            width={282}
                            className="2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute left-0 -z-10"
                        />
                        <h1 className='text-desktop-heading4 font-bold z-50 '>{blog.title}</h1>
                    </div>
                    <Image alt='logo' width={40} height={40} src='/blogplaceholder.svg' />
                </div>
                <MainBlogText text={blog.text}/>
            </div>
        </MainLayout>
    )
}

export default BlogDetail
