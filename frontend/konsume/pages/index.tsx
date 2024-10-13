'use client';
import HomeBody from '@/modules/home/HomeBody';
import HomeNav from '@/modules/home/HomeNav';
import { Analytics } from "@vercel/analytics/react"

function Home() {
  
  return (
    <>
      <div className="font-jakarta md:bg-white bg-[#D6FBC4]  flex flex-col gap-10">
        <HomeNav />
        <HomeBody />
        <Analytics />
        
      </div>
    </>
  );
}

export default Home;
