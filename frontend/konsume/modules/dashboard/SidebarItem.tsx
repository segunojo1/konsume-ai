import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SidebarProps } from '../../@types';
import Cookies from 'js-cookie';

const SidebarItem: React.FC<SidebarProps> = ({ icon, text, href }) => {
  const handleClick = () => {
    if (href == 'auth/login') {
      Cookies.remove('ktn');
      Cookies.remove('userid');
    }
  };
  return (
    <Link href={`/${href}`}>
      <div
        className="flex gap-5 hover:text-[#b6a5ff] text-[#032902B2] font-medium text-xl leading-[53px] rounded-lg cursor-pointer items-center p-3"
        onClick={handleClick}
      >
        <Image src={icon} alt={text} className="w-[32px]" />
        <p className=" text-xs font-semibold">{text}</p>
      </div>
    </Link>
  );
};

export default SidebarItem;
