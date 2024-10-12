// pages/blog/[id].tsx

import { BlogProps } from '@/@types'
import MainLayout from '@/components/Layout/MainLayout'
import { axiosKonsumeInstance } from '@/http/konsume'
import MainBlogText from '@/modules/blog/MainBlogText'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useUserContext } from '@/context/UserContext'

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dynamic route ID
  const [blog, setBlog] = useState<BlogProps | null>(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Track loading state
  const { profileID } = useUserContext();

  useEffect(() => {
    if (!id) return; // Wait until 'id' is available

    const fetchBlogData = async () => {
      try {
        // Check localStorage for the blog
        const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const selectedBlog = blogs.find((blog: any) => blog.id === id);

        if (selectedBlog) {
          // Blog found in localStorage
          setBlog(selectedBlog);
        } else {
          // Blog not found, fetch from API
          const { data } = await axiosKonsumeInstance.get(`/api/Blog/GetBlogById/${id}`);

          if (data) {
            setBlog(data);
            console.log('blog fetchedd');
            
            // Save blog to localStorage
            const updatedBlogs = [...blogs, data];
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
          }
        }
      } catch (error) {
        console.error('Error fetching blog from API:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogData();
  }, [id]); // Trigger effect whenever 'id' changes

  useEffect(() => {
    const addToStreaks = async () => {
      if (!profileID) return; // Guard for profileID
      try {
        const { data } = await axiosKonsumeInstance.get('/api/Streak/update-reading-streak', {
          params: { profileId: profileID },
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    addToStreaks();
  }, [profileID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <MainLayout topBarIcon="blog" topBarText="Blogs" fixedTopbar={true} className="relative ">
      <div className="shadow-inner absolute cursor-pointer rounded-full hover:shadow-md">
        <Image alt="logo" width={31} height={31} src="/backbtn.png" onClick={() => router.back()} />
      </div>
      <div className="font-satoshi mt-7 gap-8 flex flex-col">
        <div className="flex justify-center max-w-[975px] w-full relative mx-auto">
          <div className="relative">
            <Image
              src="/curved_line.svg"
              alt="curved line"
              height={500}
              width={282}
              className="2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute left-0 -z-10"
            />
            <h1 className="text-desktop-heading4 font-bold z-50">{blog.title}</h1>
          </div>
          <Image alt="logo" width={40} height={40} src="/blogplaceholder.svg" className="absolute right-0" />
        </div>
        <MainBlogText id={blog.id} text={blog.text} category={blog.category} titlee={blog.title} />
      </div>
    </MainLayout>
  )
}

export default BlogDetail
