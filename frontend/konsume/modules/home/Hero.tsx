
import Image from "next/image"
import easier from "../../public/easier2.png";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="md:max-w-[800px] max-w-[349px] flex flex-col gap-[67px] md:self-start self-center mx-auto md:mx-0 z-50 2xl:px-[90px] px-[30px] ">
        <h1 className="text-[54px]/[65px] md:text-[118px]/[120%] z-50  font-bold tracking-[-7px] flex flex-col md:items-start justify-center items-center md:justify-start relative ">
          Eating Healthy has never been
          <Image
            src={easier}
            alt="easier"
            className="relative bottom-0 md:[337px] w-[177px] md:-left-4 "
            width={337}
            height={90}
          />
        </h1>
        <div className="cursor-pointer flex gap-[17px] ">
          <Link href="/auth/login" className="text-[19px] font-bold rounded-[40px] text-primarygtext bg-primary-bg px-[25px] py-[10px]">
            Log in
          </Link>
          <Link href="/auth/signup" className="z-[1000] text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]">
            Join Us
          </Link>
        </div>
      </div>
  )
}

export default Hero