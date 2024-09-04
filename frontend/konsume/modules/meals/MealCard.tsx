import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import MealsContext from '@/context/MealsContext';
import { debounce } from '@/helpers/debounce';

const MealCard = ({ meal }: any) => {
  const API_KEY = process.env.NEXT_PUBLIC_RAPID_KEY;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {recommendedMeals}: any = useContext(MealsContext);
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
    <div className='shadow-bordershad border-2 border-[black] rounded'>
      <Link href={`/meals/${meal?.name}`}>
        <Image
          src={imageUrl || '/placeholder1.jpeg'}
          loading='lazy'
          height={96}
          width={260}
          alt='food'
          className='w-full h-[130px] object-cover'
        />
        <div className='p-3'>
          <h1 className='text-desktop-content font-bold'>
            {meal?.name}
          </h1>
          <p className='text-desktop-content'>{meal?.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default MealCard;
