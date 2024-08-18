import React from 'react';
import HealthCheckboxes from './HealthCheckboxes';
import Image from 'next/image';
import line from '../../public/assets/line.png';
import { useSetupContext } from '../../context/SetupContext';
import { toast } from 'react-toastify';

const HealthConditions = () => {
  const { previousPage, nextPage, possibleDiseases } = useSetupContext();

  const checkForm = () => {
    if (possibleDiseases.length >= 1) {
      nextPage();
    } else {
      toast.error('Please select a health condition');
    }
  };
  return (
    <div className="font-jakarta md:py-14 md:px-10 py-9 px-3 md:mt-16 mt-10 rounded-[20px] mx-auto bg-primary-bg transition-opacity">
      <div>
        <div className="font-jakarta">
          <h1 className="md:text-[22px] text-[16px] font-bold mb-6">
            Do you have any of these health conditions - Select all that applies.
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <HealthCheckboxes label="Diabetes" specify="false" />
          <HealthCheckboxes label="Hypertension" specify="false" />
          <HealthCheckboxes label="Food allergies" specify="false" />
          <HealthCheckboxes label="Digestive issues" specify="false" />
          <HealthCheckboxes label="Cholesterol management" specify="false" />
          <HealthCheckboxes label="Vegetarian/vegan preferences" specify="false" />
          <HealthCheckboxes label="Gluten sensitivity" specify="false" />
          <HealthCheckboxes label="Lactose intolerance" specify="false" />
          <HealthCheckboxes label="Nut allergies" specify="false" />
          <HealthCheckboxes label="Fish and Shellfish allergies (Shrimps, Tuna, Salmon, Crab, e.t.c)" specify="false" />
          <HealthCheckboxes label="Grain and Legume-Based Allergies (Wheat, Soy,  e.t.c)" specify="false" />
          <HealthCheckboxes label="Other" specify="true" />
          <HealthCheckboxes label="None" specify="false" />
        </div>
      </div>
      <p className=" font-satoshi  text-xl md:text-[28px] font-bold text-center mt-20 text-[#0C2503]">Keep going!</p>
      <div className="flex gap-5 mx-auto w-fit mt-3">
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={previousPage}
        >
          <Image alt="line" src={line} width="30" height="30" className="" />
        </div>
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={checkForm}
        >
          <Image alt="line" src={line} width="30" height="30" className="rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default HealthConditions;
