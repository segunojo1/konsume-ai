import React, { useContext, useEffect, useState } from "react";
import veg from "../../public/assets/kons.png";
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";

const ComingHead = () => {
  const { name } = useSetupContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client
    setIsClient(true);
  }, []);

  return (
    <div className="font-satoshi bg-[#8C77EC] p-5 mt-7 rounded-2xl dashboardhead">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <h1 className=" text-[#D6FBC4] leading-[57px] text-[42px] font-bold">
            On the Horizon
          </h1>
          <p className=" text-sm font-light text-[white]">
            We&apos;re constantly evolving to bring you the best in personalized
            nutrition. Check out these exciting features that are on the way to
            help you achieve your health and wellness goals!
          </p>
          <p className=" font-medium text-sm">
            <span className="text-[#FFFFFF] font-jakarta">:</span>{" "}
            <span className="text-[#FFC501]">Konsume</span>{" "}
          </p>
        </div>
        <Image src={veg} alt="veg" className="md:block hidden w-[250px]" />
      </div>
    </div>
  );
};

export default ComingHead;
