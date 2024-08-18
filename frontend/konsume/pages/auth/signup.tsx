import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ChooseAccount from '@/modules/ChooseAccount';
import { personalAccountFeatures } from '@/helpers/personalAccountFeatures';
import { restaurantAccountFeatures } from '@/helpers/restaurantAccountFeatures';
import Link from 'next/link';

const Signup = () => {
  const router = useRouter();

  return (
    <div className={` font-satoshi pb-5 py-10 px-5 `}>
      <div className='flex-col flex w-fit gap-5 mx-auto'>
        <div className='flex flex-col md:flex-row'>

          <Link href="/auth/login" className=" shadow-shad flex gap-[10px] items-center justify-center rounded-full cursor-pointer w-[43px] h-[43px] bg-primary-bg">
            <Image src="/backk.png" alt="back" width={11} height={22} className="" />
          </Link>
          <div className='flex flex-col items-center 2xl:gap-[36px] gap-3 mx-auto max-w-[767px] '>
            <div className='flex items-center gap-4 relative w-fit mb-3'>
              <h1 className='2xl:text-desktop-heading2 lg:text-[42.67px]/[120%] text-mobile-heading1 font-bold  '>Thank you for </h1>
              <div className=' '>
                <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute 2xl:top-5 xl:top-1 2xl:-right-[14px] xl:-right-[48px] -z-10' />
                <h1 className=' 2xl:text-[55px]/[120%] lg:text-[42.67px]/[120%] text-mobile-heading1 italic font-bold z-50'>Joining Us</h1>
              </div>
            </div>
            <p className='lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center'>Create your account to embark on a healthier, happier lifestyle, <br /></p>
            <b className='italic lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center'>Choose your account type.</b>

          </div>
        </div>
        {/* <Image src='/assets/back-gradient.png' width={473.93} height={241.42} alt='gradient' className='rounded-[61469.42px] absolute'/> */}
        {/* <div className='2xl:w-[473.93px] lg:w-[401px] 2xl:h-[241.42px] lg:h-[214px] rounded-[61469.42px] mx-auto bg-neutrals-100 fixed top-[180px] left-0 right-0 -z-10 blur-[170.6px]'></div> */}
        <div className=' mx-auto'>
          {/* <h3 className='lg:text-[16px]/[120%] 2xl:text-desktop-highlight  w-fit mx-auto'>Sign up for yourself and get personalized meal<br /> recommendations, progress tracking, and more.</h3>
        <div className='font-bold text-desktop-content text-center mb-4 2xl:mb-11 mt-5'>
          Already have an account?{' '}
          <Link href="/auth/login" className="  text-secondary">
            Login
          </Link>{' '}
        </div> */}
          <div className='flex flex-col md:flex-row gap-[90px]'>
            <div className='bg-[#EDFAE7] flex flex-col gap-8 p-4 rounded-[20px] max-w-[520px]'>
              <Image src="/personal.png" alt="personal account" width={460} height={48} />
              <div className='flex flex-col gap-5'>
                {
                  personalAccountFeatures.map(({ title, text }) => <ChooseAccount title={title} text={text} />)
                }
              </div>
              <Link href='/auth/personal/signup' >
                <Button className='scroll-button overflow-hidden flex justify-end py-4 w-full rounded-[8px] border-2 border-primarygtext text-[#032902] text-desktop-highlight font-bold'>
                  <span className='first-text'> Start Your Personalized Journey!</span> <span className='second-text'>Get Started</span>
                </Button>
              </Link>
            </div>
            <div className='border-[3px] border-primarygtext flex flex-col gap-8 p-4 rounded-[20px] max-w-[520px]'>
              <Image src="/restaurant.png" alt="personal account" width={460} height={48} />
              <div className='flex flex-col gap-5'>
                {
                  restaurantAccountFeatures.map(({ title, text }) => <ChooseAccount title={title} text={text} />)
                }
              </div>
              <Button
                type="submit"
                className="flex mt-auto items-center justify-center mx-auto p-2 w-full h-[2.9rem] text-primary-bg-100 bg-primarygtext"
              >
                Showcase Your Restaurant!
              </Button>
            </div>
          </div>

        </div>
        {/* <OtpModal /> */}
      </div>
    </div>
  );
};

export default Signup;
