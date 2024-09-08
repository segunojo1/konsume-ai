import MainLayout from '@/components/Layout/MainLayout'
import BlogIntroductoryCard from '@/modules/blog/onboard/BlogIntroductoryCard'
import BlogOnboardHead from '@/modules/blog/onboard/BlogOnboardHead'
import React from 'react'

const BlogOnboard = () => {
  return (
    <MainLayout topBarIcon='blog' topBarText='Blogs' fixedTopbar={true} className=' '>
      <div className='  gap-5 mb-6'>
        <BlogOnboardHead />
        <BlogIntroductoryCard />
      </div>
    </MainLayout>
  )
}

export default BlogOnboard