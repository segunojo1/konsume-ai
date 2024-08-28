import gemini from '@/http/gemini';
import { tree } from 'next/dist/build/templates/app-page';
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import MealsContext from '@/context/MealsContext';

const debounce = (fn: Function | any, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
  };
};
const MealCard = ({query, meal}:any) => {
  const [answer, setAnswer] = useState<string | null>(null);
    const [foodDesc, setFoodDesc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const {setRecommendedMeals, recommendedMeals} = useContext(MealsContext);

   

const options:any = {
  method: 'POST',
  url: 'https://openjourney1.p.rapidapi.com/models/stabilityai/stable-diffusion-xl-base-1.0',
  headers: {
    'x-rapidapi-key': '69f9940100msh53805ec922ce8b3p1fd451jsnd7939c9125fd',
    'x-rapidapi-host': 'openjourney1.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    inputs: meal?.name
  },
  responseType: 'blob'
};
const genImage = async  () => {
  try {
    const { data: blob } = await axios.request(options);
    console.log(blob);
    
    // Create a URL from the blob
    const imageUrl = URL.createObjectURL(blob);

    // Set the image URL to state or wherever needed
    setImageUrl(imageUrl);
  } catch (error) {
    console.error(error);
  }
}
useEffect(() => {
  genImage()
}, [recommendedMeals])


    // Trigger the description generation once `answer` is updated
  //   useEffect(() => {
  //     if (answer) {
  //       genImage()
  //         generateMealDesc();
  //     }
  // }, [answer]); // Dependency on `answer` ensures this effect runs after `answer` is updated

    // useEffect(() => {
    //     generateMealCards();
    // }, [query]);
  return (
    <div className='shadow-bordershad border-2 border-[black] rounded'>
      <Link href={`/meals/${answer}`}>
        <Image src={imageUrl ? imageUrl : '/placeholder1.jpeg'} loading='lazy' height={96} width={260} alt='food' className='w-full h-[130px] object-cover'/>
        <div className=' p-3'>
        <h1 className=' text-desktop-content font-bold'>{isLoading ? 'loading...' : meal?.name}</h1>
        <p className=' text-desktop-content'>{isLoading2 ? 'loading...' : meal?.description}</p>
        </div>
        </Link>
    </div>
  )
}

export default MealCard