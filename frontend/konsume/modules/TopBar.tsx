import Image from 'next/image'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google: any;
  }
}

const TopBar = ({setToggled, className, topBarText, topBarIcon}:any) => {
  const navClick = () => {
    setToggled((prev:any) => !prev);
  };

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
        return; // Script already exists, don't add it again
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en'}, 
          'google_translate_element'
        );
      }
    };

    // Attach the function to the window object
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Add the Google Translate script to the document
    addGoogleTranslateScript();

    return () => {
      // Cleanup by setting the function to undefined
      window.googleTranslateElementInit = undefined;
    };
  }, []);
  // const textt = document.getElementById('goog-te-gadget')
  

  return (
    <div className={twMerge(' right-0 left-0 md:ml-[100px] md:mr-7 flex justify-between  px-10 py-5 font-satoshi shadow-bordershad border-b-[1px] border-[#4a4a682e] bg-[#fafafa7d] z-10', className)}>
      <div className='flex gap-5 items-center'>
        <Image alt='chatai' src={`/${topBarIcon}.svg`} width={30} height={30}/>
        <p className=' font-bold text-desktop-content'>{topBarText}</p>
      </div>
      <div className='flex gap-4 items-center justify-center'>
        <div className='googleTranslateWrapper'>
      <div id="google_translate_element"></div>
        </div>
        <div className='block md:hidden' onClick={navClick}>
        <Image src='/icon2.svg' alt='' width={15} height={15}/>
        </div>
        <Image src='/notifications.svg' alt='' width={15} height={15} className='w-[15px] h-[15px]'/>
        <Image src='/avatar.svg' alt='' width={40} height={40}/>
      </div>
    </div>
  )
}

export default TopBar