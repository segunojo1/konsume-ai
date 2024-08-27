import Image from "next/image";
import scanner from "../../../public/restaurant.svg";
import tea from "../../../public/teacup.svg";

const DashboardHighlights = () => {
  return (
    <div className="flex gap-2 cursor-pointer font-jakarta">
      <div className="bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco flex-[.5]">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-xs">Restaurant Track</p>
          <Image src={scanner} alt="restaurant" />
        </div>
      </div>

      <div className="bg-primary-bg p-4 rounded-2xl js-tilt h-full mealreco flex-[.5]">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold">Daily Nutritional Tea</p>
          <Image src={tea} alt="tea" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-desktop-caption font-bold">"Did You Know"</h1>
          <p className="italic text-[12px]/[20px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
            pellentesque torto, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit
            amet, consectetur adipiscing elit. Urna pellentesque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHighlights;
