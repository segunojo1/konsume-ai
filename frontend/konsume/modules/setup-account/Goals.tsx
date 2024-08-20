import React, { useState } from 'react';
import GoalCheckbox from './GoalCheckbox';
import line from '../../public/assets/line.png';
import Image from 'next/image';
import { useSetupContext } from '../../context/SetupContext';
import { toast } from 'react-toastify';
import { dashboardhero } from '../dashboard/dashboardhero';
import MultiStepProgressBar from '../MultiStepProgressBar';

const Goals = () => {
  const { nextPage, previousPage, userGoal, currentPage } = useSetupContext();
  const [test, setTest] = useState(false);
  const checkForm = () => {
    if (userGoal) {
      nextPage();
    } else {
      toast.error('Please select a goal');
    }
  };

  return (
    <div className="font-jakarta md:py-14 md:px-10 py-9 px-3 md:mt-16 mt-10 rounded-[20px] mx-auto bg-primary-bg relative transition-opacity">
      <div>
        <div className="">
          <h1 className="md:text-[22px] text-[16px] font-bold mb-6">
            What are your health and wellness goals? (Check all that apply)
          </h1>
        </div>
        <div className="flex flex-col md:gap-5 gap-4">
          {dashboardhero.map(({ title }) => (
            <GoalCheckbox key={title} label={title} data={title} />
          ))}
        </div>
      </div>
      <p className=" font-satoshi  text-xl md:text-[28px] font-bold text-center mt-20 text-[#0C2503]">Just a little more info!</p>
      <div className="flex gap-5 mx-auto w-fit mt-3">
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

export default Goals;
