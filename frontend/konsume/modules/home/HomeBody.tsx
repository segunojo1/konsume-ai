import Link from 'next/link';
import React from 'react';

const HomeBody = () => {
  return (
    <div className="bg-[#E0F2D8] md:pt-[76px] md:px-[71px] flex flex-col items-center gap-5">
      <div className="md:bg-[#FFFFFF59] bg-[#E0F2D8] md:py-[76px] px-[50px] py-[30px] md:px-[101px] flex flex-col items-center justify-center gap-10">
        <h1 className=" font-normal text-5xl text-start">
          <span className="text-[#8C77EC]">Eating Healthy</span> has never been{' '}
          <span className="text-[#FFC501]">Easier</span>.
        </h1>
        <p className=" text-xl font-normal text-start">
          Konsume&apos;s AI-driven platform offers personalized nutrition plans and tailored wellness tips, empowering
          you to achieve your nutritional and health goals effortlessly.{' '}
        </p>
      </div>
      <Link href="/auth/signup">
        <button className="bg-[#8DCF38] text-[#005450] w-[123px] py-[10px] rounded-[49px] mb-[30px]">Join Us</button>
      </Link>
    </div>
  );
};

export default HomeBody;
