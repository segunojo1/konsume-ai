import React from "react";
import star from "../../public/assets/star2.png";
import star3 from "../../public/assets/star3.png";
import star5 from "../../public/assets/star5.svg";
// import VanillaTilt from 'vanilla-tilt'
import Image from "next/image";

const ComingBody = () => {
  return (
    <div className="">
      <div className="gap-2 flex md:flex-row flex-col font-jakarta">
        <div className="bg-[#D6FBC4] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xl text-[#0C2503] ">
              Progress Tracker
            </p>
            <Image src={star} alt="star" />
          </div>
          <p>
            Stay on top of your health goals with our new Progress Tracker.
            Easily log what you consume daily and monitor your nutritional
            intake.
            <br />
            Set your goals, track your progress, and achieve your wellness
            targets with ease
            <br />.
            <br />
            Whether it&apos;s tracking calories, macros, or specific nutrients,
            our Progress Tracker has you covered!
          </p>
        </div>

        <div className="bg-[#B0D2C1] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xl text-[#0C2503] ">
              Meal Search Information
            </p>
            <Image src={star3} alt="star" />
          </div>
          <p>
            Find comprehensive information on any meal with our new Meal Search
            feature.
            <br />
            From nutritional content to recipe ideas and health impacts, get all
            the details you need.
            <br />
            Simply type in the meal name, and we&apos;ll provide you with
            tailored information to fit your dietary preferences and health
            goals.
          </p>
        </div>

        <div className="bg-[#8C77EC] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xl text-[#0C2503] ">
              Personalized Meal Plans
            </p>
            <Image src={star5} alt="star" />
          </div>
          <p>
            Take the guesswork out of your diet with our Personalized Meal
            Plans. Based on your health goals, dietary preferences, and
            nutritional needs, our AI generates a customized meal plan just for
            you.
            <br />
            Whether you&apos;re looking to lose weight, gain muscle, or maintain
            a balanced diet, our meal plans provide delicious and nutritious
            options that fit your lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingBody;
