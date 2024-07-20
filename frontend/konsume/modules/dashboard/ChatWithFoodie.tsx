import React from 'react';
import { Input } from '../../ui/input';
import Image from 'next/image';
import kons from '../../public/assets/kons.png';
import Link from 'next/link';

const ChatWithFoodie = () => {
  return (
    <Link href="/chat">
      <div className="flex items-center md:flex-row flex-col ">
        <p className=" text-[#032902] font-semibold text-[19px] w-max">Chat with Foodie AI</p>
        <div className="relative  w-full">
          <Input
            placeholder="What are some good post-workout snacks?"
            className=" px-5 text-[#0C250380] font-medium leading-[47.69px] bg-[#FFFFFF] border-[3.5px] border-[#D7F2CD] rounded-[46.5px]"
          />
          <Image src={kons} alt="kons" className="md:w-[43px] w-[30px] absolute right-5 my-auto top-0 bottom-0" />
        </div>
      </div>
    </Link>
  );
};

export default ChatWithFoodie;
