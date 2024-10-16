import Image from "next/image";
import React from "react";
import pan from "../../public/hero_pan.svg";
import pann from "../../public/pann.svg";
import plate from "../../public/konsumeplate.svg";
import Hero from "./Hero";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import Link from "next/link";
import FAQs from "./FAQs";
import Footer from "./Footer";

const HomeBody = () => {
  return (
    <div className="flex pt-[200px] flex-col font-satoshi">
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <div className="flex pt-[98.06px] flex-col items-center bg-primary-bg">
        <h1 className="text-[42.88px]/[51.46px] font-bold">
          Konsume in Action!
        </h1>
        <p className="text-[22.51px]/[27.01px] text-primarytext">
          Every Bite, Powered by AI
        </p>
        <Image src={plate} alt="plate" className="" width={162} height={162} />
      </div>
      <SectionFour />
      <div className="pt-[34px] pb-[129px] flex  bg-primary-bg">
        <Link
          href="/auth/signup"
          className=" mx-auto text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]"
        >
          Join Us
        </Link>
      </div>
      <FAQs />
      <div className="bg-primary-bg">

      <Footer />
      </div>
      <Image
        src={pan}
        alt="easier"
        className="absolute hidden md:block -top-7 right-0 z-0 "
        width={858}
        height={869}
      />
      <Image
        src={pann}
        alt="easier"
        className="absolute block my-auto top-0 bottom-0 md:hidden right-0 left-0 mx-auto z-0 "
        width={237}
        height={237}
      />
    </div>
  );
};

export default HomeBody;
