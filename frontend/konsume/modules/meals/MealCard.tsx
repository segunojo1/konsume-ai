import gemini from '@/http/gemini';
import { tree } from 'next/dist/build/templates/app-page';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MealCard = ({query}:any) => {
  const [answer, setAnswer] = useState("");
  const [loading, setIsLoading] = useState(false);
  
  const debounce = (fn: Function | any, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

const generateMealCards = async () => {
  try {
    setIsLoading(true)
    const { data } = await gemini.post("/gemini-pro:generateContent", {
      contents: [{ parts: [{ text: query }] }],
    });
    console.log(data);
    setAnswer(data.candidates[0].content.parts[0].text);
    setIsLoading(false)
  } catch (error) {
    console.error("Error generating meal content:", error);
  }
} // Throttle time, e.g., 2000ms = 2 seconds

// Use throttledGenerateMealCards(query) instead of calling the function directly

  useEffect(() => {
    const debounceMakeRequest = debounce( generateMealCards, 2000);
    debounceMakeRequest();
  }, [])

  return (
    <div className='shadow-bordershad border-2 border-[black] rounded'>
        <Image src='/fruits.jpeg' height={96} width={260} alt='food' className='w-full h-[130px] object-cover'/>
        <div className=' p-3'>
        <h1 className=' text-desktop-content font-bold'>{loading ? 'loading...' : answer}</h1>
        <p className=' text-desktop-content'>A popular dish containing some ingredients like ...</p>
        </div>
    </div>
  )
}

export default MealCard