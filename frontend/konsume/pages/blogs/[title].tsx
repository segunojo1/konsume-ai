// pages/blog/[title].tsx

import { BlogProps } from '@/@types'
import MainLayout from '@/components/Layout/MainLayout'
import { axiosKonsumeInstance } from '@/http/konsume'
import MainBlogText from '@/modules/blog/MainBlogText'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const BlogDetail = () => {
    const router = useRouter()
    const { title } = router.query
    const [blog, setBlog] = useState<BlogProps>();

    useEffect(() => {
        const fetchBlogData = async () => {
          if (title) {
            // First, check localStorage
            const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
            const selectedBlog = blogs.find((blog: any) => 
                typeof title === 'string' && blog.title.toLowerCase() === title.toLowerCase()
              );    
            if (selectedBlog) {
              // Blog found in localStorage
              setBlog(selectedBlog);
            } else {
              // Blog not found in localStorage, fetch from API
              try {
                const { data } = await axiosKonsumeInstance.get('/api/Blog/GenerateBlog', {
                  params: { title },
                });
    
                if (data) {
                  // Set blog data from API
                  setBlog(data);
    
                  // Optionally store it in localStorage for future access
                  const updatedBlogs = [...blogs, data];
                  localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
                }
              } catch (error) {
                console.error('Error fetching blog from API:', error);
              }
            }
          }
        };
    
        fetchBlogData();
      }, [title]);
      useEffect(() => {
        const addToStreaks = async () => {
          try {
            const {data} = await axiosKonsumeInstance.get('/api/Streak/read', {
              params: {
                profileId: Cookies.get('userid')
              }
            })
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
        addToStreaks();
      }, [])

    if (!blog) {
        return <p>Loading...</p>
    }

    return (
        <MainLayout topBarIcon='blog' topBarText='Blogs' fixedTopbar={true} className='relative '>
          <div className='shadow-inner absolute cursor-pointer rounded-full hover:shadow-md'>
            <Image alt='logo' width={31} height={31} src='/backbtn.png' className=' ' onClick={() => router.back()}/>
          </div>
            <div className='font-satoshi mt-7 gap-8 flex flex-col' >
                <div className='flex justify-center max-w-[975px] w-full relative mx-auto'>
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
                    <Image alt='logo' width={40} height={40} src='/blogplaceholder.svg' className='absolute right-0'/>
                </div>
                <MainBlogText text={blog.text} category={blog.category} titlee={blog.title} />
            </div>
        </MainLayout>
    )
}

export default BlogDetail
