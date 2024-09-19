import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ChooseAccount from '@/modules/ChooseAccount';
import { personalAccountFeatures } from '@/helpers/personalAccountFeatures';
import { restaurantAccountFeatures } from '@/helpers/restaurantAccountFeatures';
import Link from 'next/link';
import withoutAuth from '@/helpers/withoutAuth';

const Signup: React.FC = () => {
  const router = useRouter();

  return (
    <div className="font-satoshi pb-5 py-10 px-5">
      <div className="flex-col flex w-fit gap-5 mx-auto">
        <div className="flex flex-col md:flex-row">
          <Link href="/auth/login">
            <div className="shadow-shad flex gap-[10px] items-center justify-center rounded-full cursor-pointer w-[43px] h-[43px] bg-primary-bg">
              <Image src="/backk.png" alt="back" width={11} height={22} />
            </div>
          </Link>
          <div className="flex flex-col items-center 2xl:gap-[36px] gap-3 mx-auto max-w-[767px]">
            <div className="flex items-center gap-4 relative w-fit mb-3">
              <h1 className="2xl:text-desktop-heading2 lg:text-[42.67px]/[120%] text-mobile-heading1 font-bold">
                Choose your 
              </h1>
              <div>
                <Image
                  src="/curved_line.svg"
                  alt="curved line"
                  height={500}
                  width={282}
                  className="2xl:w-[282px] lg:w-[250px] w-[141.16px] absolute 2xl:top-5 xl:top-1 2xl:-right-[14px] xl:-right-[48px] -z-10"
                />
                <h1 className="2xl:text-[55px]/[120%] lg:text-[42.67px]/[120%] text-mobile-heading1 italic font-bold z-50">
                Account Type
                </h1>
              </div>
            </div>
            <p className="lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center">
              Create your account to embark on a healthier, happier lifestyle,
              <br />
            </p>
            {/* <b className="italic lg:text-[21.33px]/[120%] 2xl:text-desktop-feature text-center">
              Choose your account type.
            </b> */}
          </div>
        </div>

        <div className="mx-auto">
          <div className="flex flex-col md:flex-row gap-[90px]">
            <div className="bg-[#EDFAE7] flex flex-col gap-8 p-4 rounded-[20px] max-w-[520px]">
              <Image src="/personal.png" alt="personal account" width={460} height={48} />
              <div className="flex flex-col gap-5">
                {personalAccountFeatures.map(({ title, text }) => (
                  <ChooseAccount key={title} title={title} text={text} />
                ))}
              </div>
              <Link href="/auth/personal">
                <Button className="scroll-button overflow-hidden flex justify-end py-4 w-full rounded-[8px] border-2 border-primarygtext text-[#032902] text-desktop-highlight font-bold">
                  <span className="first-text"> Start Your Personalized Journey!</span>{' '}
                  <span className="second-text">Get Started</span>
                </Button>
              </Link>
            </div>

            <div className="border-[3px] border-primarygtext flex flex-col gap-8 p-4 rounded-[20px] max-w-[520px]">
              <Image src="/restaurant.png" alt="restaurant account" width={460} height={48} />
              <div className="flex flex-col gap-5">
                {restaurantAccountFeatures.map(({ title, text }) => (
                  <ChooseAccount key={title} title={title} text={text} />
                ))}
              </div>
              <Button
                type="button"
                className="flex mt-auto items-center justify-center mx-auto p-2 w-full h-[2.9rem] text-primary-bg-100 bg-primarygtext"
                onClick={() => router.push('/auth/restaurant')}
              >
                Showcase Your Restaurant!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withoutAuth(Signup);
