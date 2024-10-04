import Image from "next/image"
import line from "../../public/rough-line.svg";
import line2 from "../../public/rough-line2.svg";
import card1 from "../../public/timetable-meal-info.svg";
import card2 from "../../public/dashboardmobile.svg";
import card3 from "../../public/timetable-meal-info.svg";
import pan2 from "../../public/pan2.svg";
import Link from "next/link"
import Marquee from "@/components/ui/marquee";

const SectionOne = () => {
  return (
    <div className="  min-w-full">
        <div className="flex flex-col absolute left-0  min-w-full ">
          <Image
            src={line2}
            alt="line"
            className=" absolute min-w-full -top-6 min-h-[42px]"
          />
          <Image
            src={line}
            alt="line"
            className=" absolute min-w-full min-h-[42px]"
          />
        </div>
        <div className="bg-primary-bg mt-24  pt-28 flex flex-col gap-[7px] items-center justify-center">
          <h1 className="max-w-[326px] text-[42px]/[51px] font-bold">
            Serve Up Your Healthy Journey
          </h1>
          <Image
            src={pan2}
            alt="easier"
            className="animate-spin "
            width={168}
            height={168}
          />
          <Marquee className="md:hidden hidden">
          <div className="flex overflow-scroll md:overflow-hidden gap-[68px] h-[660px]">
            <Image
              src={card1}
              alt="card"
              className="h-[606px] "
              width={308}
              height={606}
            />
            <div className="md:relative w-[308px] h-[660px]">
              <Image
                src={card2}
                alt="card"
                className=" md:absolute bottom-0 w-[308px] h-[606px] "
                width={308}
                height={606}
              />
            </div>
            <Image
              src={card3}
              alt="card"
              className=" h-[606px] "
              width={308}
              height={606}
            />
          </div>
          </Marquee>
          <div className="md:flex hidden gap-[68px] h-[660px]">
            <Image
              src={card1}
              alt="card"
              className="h-[606px] "
              width={308}
              height={606}
            />
            <div className="md:relative w-[308px] h-[660px]">
              <Image
                src={card2}
                alt="card"
                className=" md:absolute bottom-0 w-[308px] h-[606px] "
                width={308}
                height={606}
              />
            </div>
            <Image
              src={card3}
              alt="card"
              className=" h-[606px] "
              width={308}
              height={606}
            />
          </div>
          <Link href="/auth/signup" className="mt-[85px] text-[19px] font-bold rounded-[40px] bg-primarygtext text-primary-bg px-[25px] py-[10px]">
            Join Us
          </Link>
        </div>
      </div>
  )
}

export default SectionOne