import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const loadingTexts = [
  'Creating your profile...',
  'Setting up preferences...',
  'Saving your data...',
  'Almost done...'
];
const CreateProfileLoader = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`z-50 fixed  backdrop-blur-md flex items-center flex-col gap-5  justify-center top-0 left-0 bottom-0 right-0`}>
        <Image src='/pan.svg' alt='loading pan' width={400} height={400} className='animate-spin'/>
       <AnimatePresence >
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className='font-bold text-desktop-hero'>{loadingTexts[currentTextIndex]}</h1>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CreateProfileLoader