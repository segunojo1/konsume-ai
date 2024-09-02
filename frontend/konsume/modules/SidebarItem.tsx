import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { SidebarProps } from '../@types';
import Cookies from 'js-cookie';
import MealsContext from '@/context/MealsContext';

const SidebarItem: React.FC<SidebarProps> = ({ icon, text, href }) => {
  const { setRecommendedMeals }:any = useContext(MealsContext);
  const handleClick = () => {
    if (href == 'auth/login') {
      Cookies.remove('ktn');
      Cookies.remove('userid');
      localStorage.removeItem('recommendedMeals');
      localStorage.removeItem('lastFetchDate');
    }
  };
  return (
    <Link href={`/${href}`}>
      <div
        className="flex gap-5 hover:text-[#b6a5ff] text-[#032902B2] font-medium text-xl leading-[53px] rounded-lg cursor-pointer items-center p-3"
        onClick={handleClick}
      >
        <Image src={icon} alt={text} className="" width={18} height={18}/>
      </div>
    </Link>
  );
};

export default SidebarItem;
