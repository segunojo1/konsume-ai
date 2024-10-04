import Image from "next/image";
import card4 from "../../public/meals-card.svg";
import card5 from "../../public/nutrition-card.svg";
import card6 from "../../public/streak-card.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SectionTwo = () => {
  return (
    <div id="magic" className="bg-primary-bg flex flex-col items-center ">
      <div className=" flex flex-col gap-[8px] items-center justify-center pt-[141px] mb-[56px]">
        <h1 className="text-[42px]/[51px] font-bold">The Magic</h1>
        <p className="font-medium text-[22px]/[27px]">
          Here&apos;s what we&apos;re about
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-[47px] md:h-[503px]">
        <div className="relative w-[308px] md:h-[503px]">
          <Image
            src={card4}
            alt="card"
            className="h-[412px] md:absolute bottom-0  "
            width={301}
            height={412}
          />
        </div>
        <Image
          src={card5}
          alt="card"
          className=" h-[412px] "
          width={301}
          height={412}
        />
        <div className="relative w-[308px] h-[503px]">
          <Image
            src={card6}
            alt="card"
            className=" h-[412px] md:absolute bottom-0  "
            width={301}
            height={412}
          />
        </div>
      </div>
      <Link
        href="/auth/signup"
        className=" mt-[95px] text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]"
      >
        Join Us
      </Link>
    </div>
  );
};

export default SectionTwo;
