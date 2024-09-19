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
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex === loadingTexts.length - 1 ? 0 : prevIndex + 1));
      }, 2000); // Change text every 3 seconds
      return () => clearInterval(interval);
    }, []);
  return (
    <div className={`z-50 fixed  backdrop-blur-md flex items-center flex-col gap-5 w-full h-full  justify-center top-0 left-0 bottom-0 right-0`}>
       <video
        autoPlay
        muted
        loop
        style={{}}
      >
        <source src="/pan-animation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div style={{ position: 'relative', height: '100px', width: '100%', overflow: '' }}>
       <AnimatePresence >
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            fontSize: '24px',
          }}
        >
          <h1 className='font-bold text-desktop-hero '>{loadingTexts[index]}</h1>
        </motion.div>
      </AnimatePresence>
      </div>
    </div>
  )
}

export default CreateProfileLoader