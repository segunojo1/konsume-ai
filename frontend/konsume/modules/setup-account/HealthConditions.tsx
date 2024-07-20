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
    <div className="md:p-12 p-3 mt-6 md:flex-row flex-col goals  bg-[#BEFFA7] mx-auto">
      <div>
        <div className="font-jakarta">
          <h1 className="md:text-xl text-lg font-bold mt-4 mb-4 ">
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
          <HealthCheckboxes label="Other" specify="false" />
          <HealthCheckboxes label="None" specify="false" />
        </div>
      </div>
      <p className=" font-medium text-xl md:text-4xl text-center mt-4 text-[#0C2503]">Keep going!</p>
      <div className="flex gap-5 mx-auto w-fit mt-7">
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
