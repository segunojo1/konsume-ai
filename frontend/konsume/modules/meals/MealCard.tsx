import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import MealsContext from '@/context/MealsContext';
import { debounce } from '@/helpers/debounce';

interface MealCardProps {
  meal: {
    name: string;
    description: string;
    course: string;
  }
}
const MealCard = ({ meal }: MealCardProps) => {
  const API_KEY = process.env.NEXT_PUBLIC_RAPID_KEY;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { recommendedMeals }: any = useContext(MealsContext);
  const options: any = {
    method: 'POST',
    url: 'https://openjourney1.p.rapidapi.com/models/stabilityai/stable-diffusion-xl-base-1.0',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'openjourney1.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      inputs: meal?.name,
    },
    responseType: 'blob',
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchImage = debounce(async (mealName: string) => {
    try {
      const { data: blob } = await axios.request(options);
      const base64Image = await blobToBase64(blob);
      // const imageUrl = URL.createObjectURL(blob);
      localStorage.setItem(`mealImage_${mealName}`, base64Image);
      setImageUrl(base64Image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }, 2000); // Debounce requests to prevent overwhelming the API

  useEffect(() => {
    const cachedImageUrl = localStorage.getItem(`mealImage_${meal?.name}`);
    if (cachedImageUrl) {
      setImageUrl(cachedImageUrl);
    } else {
      fetchImage(meal?.name);
    }
  }, [recommendedMeals]);

  return (
    <div className=' flex flex-col items-start gap-4 py-6 px-3 shadow-sm rounded-[34px] hover:shadow-lg font-satoshi lg:w-full w-fit'>
      <div
        className="justify-between flex flex-col gap-2 min-h-[130px] bg-primary-bg px-3 pt-3 relative rounded-lg w-full "
      >
        <Image src={`${meal.course}.svg`} width={39} height={32} alt='expand' className='absolute -top-4 -right-4' />
        <div className="flex justify-between">
          <p className="text-secondary-500 font-bold text-mobile-caption ">{meal.course}</p>
        </div>
        <div className='w-[100px] h-[62px] flex items-stretch'>
          <Image
            src={imageUrl || '/placeholder1.jpeg'}
            loading='lazy'
            height={62}
            width={100}
            alt='food'
            className='w-full object-cover'
          />
        </div>


        <div className="flex justify-between flex-col mb-14">
          <p className="text-primarygtext font-bold text-[15px]">{meal.name}</p>
          <p className="text-color8-700 font-medium text-[11.2px] max-w-[240px]">
            {meal.description}
          </p>
        </div>
      </div>
      <Link href={`/meals/${meal.name}`} className='flex gap-5 items-center cursor-pointer'>
        <Image src='/expand_meal.svg' width={39} height={32} alt='expand' className='hover:rotate-12 cursor-pointer' />
        <p className='font-bold text-[14px]/[120%]'>Open Meal</p>
      </Link>
    </div>
  );
};



export default MealCard;
