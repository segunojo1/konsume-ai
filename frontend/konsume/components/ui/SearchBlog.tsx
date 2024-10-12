import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from './input'
import { useRouter } from 'next/router';
import { axiosKonsumeInstance } from '@/http/konsume';
import { Button } from './button';
import CreateProfileLoader from '../animated-visual-cues/CreateProfileLoader';

const SearchBlog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [generatingBlog, setGeneratingBlog] = useState(false);
    const router = useRouter();
    // Ensure loader stays visible for at least 5 seconds
    const MIN_DURATION = 5000; // 5 seconds
    const startTime = Date.now();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const generateBlog = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Navigate to the search result page
        setGeneratingBlog(true);
        // Calculate remaining time to ensure the loader stays visible
      const elapsedTime = Date.now() - startTime;
      const remainingTime = MIN_DURATION - elapsedTime;
        try {
            const { data } = await axiosKonsumeInstance.get('api/Blog/GenerateBlog', {
                params: {
                    healthGoal: searchQuery
                }
            });

            // After fetching, store the new blog in localStorage for consistency
            const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
            const updatedBlogs = [...blogs, data];
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

            // Navigate to the blog page
            if (remainingTime > 0) {
                setTimeout(() => {
                    setGeneratingBlog(false);
                    router.push(`/blogs/search/${searchQuery.trim()}`);
                }, remainingTime);
              } else {
                setGeneratingBlog(false);
                router.push(`/blogs/search/${searchQuery.trim()}`);
              }
            router.push(`/blogs/search/${searchQuery.trim()}`);
        } catch (error) {
            console.error('Error fetching blog:', error);
            setGeneratingBlog(false)
        } finally {
            
        }
    };
    return (
        <div className='relative h-fit w-full  self-start justify-end'>
            <Input
                type='text'
                value={searchQuery}
                onChange={handleInputChange}
                className=' bg-base-white text-desktop-content border-[1.5px] rounded-[10px] border-[#030a0088]  w-full '
                placeholder="What do you want to read? Generate with AI"
            />
            <Button
                type="submit"
                className="mt-12 flex items-center justify-center mx-auto p-2 w-full  h-[2.9rem] text-primary-bg-100 bg-primarygtext"
                onClick={generateBlog}
            >
                Generate
            </Button>
            <div className={`z-50 fixed backdrop-blur-md bg-base-white ${generatingBlog ? 'flex' : 'hidden'}  justify-center items-center top-0 left-0 bottom-0 right-0`}>
                <CreateProfileLoader texts={[
  "Analyzing your blog topic...",
  "Processing relevant ideas...",
  "Generating unique content just for you...",
  "Refining the blog structure and flow...",
  "Finalizing your AI-generated blog post..."
]} />
            </div>
        </div>
    )
}

export default SearchBlog