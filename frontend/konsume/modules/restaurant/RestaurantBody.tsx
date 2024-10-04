import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantBody = () => {
  return (
    <div>
      <div className="font-satoshi mx-auto flex items-center justify-center px-5 flex-col gap-[55px]">
        <Image
          src="/restaurantimage.png"
          alt="restaurant"
          width={900}
          height={256}
        />
        <p className="text-[25px]/[30px] font-satoshi text-center">
          We&apos;re currently perfecting our restaurant feature to help you
          integrate your menu, and reach customers effortlessly. Get ready for a
          seamless experience once this feature goes live!
        </p>
        <Button className="px-10 py-[15px] mb-4 bg-primarygtext text-primary-bg rounded-[42px]">
            <Link href="/auth/restaurant">
            Join the waitlist
            </Link>
        </Button>
      </div>
      <div className="md:flex justify-between items-end pb-[70px] hidden">
        <Image src="/konsume3.svg" alt="restaurant" width={261} height={261} />
        <Image src="/konsume1.svg" alt="restaurant" width={261} height={261} />
          <Link href="/" className="z-[99999]">
        <Button className="px-10 py-[15px] bg-[white] text-primarytext rounded-[42px] -rotate-6 mb-11">
          Back to Home
        </Button>
          </Link>
        <Image src="/konsume4.svg" alt="restaurant" width={261} height={261} />
        <Image src="/konsume5.svg" alt="restaurant" width={261} height={261} />

        <div className="flex flex-col absolute left-0 h-[80px]  min-w-full ">
        <Image
          src="/rough-line.svg"
          alt="line"
          className=" absolute min-w-full -top-6 min-h-[42px]"
          width={900}
          height={250}
        />
        <Image
          src="rough-line2.svg"
          alt="line"
          className=" absolute min-w-full min-h-[42px]"
          width={900}
          height={250}
        />
      </div>
      </div>
      
    </div>
  );
};

export default RestaurantBody;
