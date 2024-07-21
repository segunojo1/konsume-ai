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
            Easily log what you consume daily and monitor your nutritional
            intake.
            <br />
            Set your goals, track your progress, and achieve your wellness
            targets with ease
            <br />.
            <br />
            Our Progress Tracker gamifies the experience by awarding streaks and badges for consistency.
            <br />
            You can exchange these streaks and badges for coupons and meal discounts.
          </p>
        </div>

        <div className="bg-[#B0D2C1] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xl text-[#0C2503] ">
              Restaurant and Menu Integration
            </p>
            <Image src={star3} alt="star" />
          </div>
          <p>
            Find the best places to eat and explore their menus with our new
            Restaurant and Menu Integration feature.
            <br />
            Discover detailed information about restaurant meals, including
            nutritional content, recipe ideas, and health impacts.
            <br />
            Simply select a restaurant or type in a meal name, and we&apos;ll
            provide you with tailored recommendations to fit your dietary
            preferences and health goals.
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
            Based on your health goals, dietary preferences, and nutritional needs, our AI generates a customized meal timetable just for you.
            <br />
            Whether you're looking to lose weight, gain muscle, or maintain a balanced diet, our meal timetables provide delicious and nutritious options that fit your lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingBody;
