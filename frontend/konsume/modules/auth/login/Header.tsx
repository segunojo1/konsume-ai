import Image from "next/image";

const Header = () => (
    <div className='flex flex-col items-center gap-3 max-w-[767px]'>
      <div className='flex items-center gap-4 relative w-fit'>
          <h1 className='2xl:text-desktop-heading2 lg:text-[42.67px]/[120%] text-mobile-heading1 font-bold  '>Thank you for </h1>
          <div className=' '>
            <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute 2xl:top-5 xl:top-1 2xl:-right-[14px] xl:-right-[48px] -z-10' />
            <h1 className=' 2xl:text-[55px]/[120%] lg:text-[42.67px]/[120%] text-mobile-heading1 italic font-bold  z-50'>Joining Us</h1>
          </div>
        </div>
    </div>
  );

export default Header