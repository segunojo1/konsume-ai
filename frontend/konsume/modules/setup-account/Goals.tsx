import React, { useState } from 'react';
import GoalCheckbox from './GoalCheckbox';
import line from '../../public/assets/line.png';
import Image from 'next/image';
import { useSetupContext } from '../../context/SetupContext';
import { toast } from 'react-toastify';
import { dashboardhero } from '../dashboard/dashboardhero';

const Goals = () => {
  const { nextPage, previousPage, userGoal } = useSetupContext();
  const [test, setTest] = useState(false);
  const checkForm = () => {
    if (userGoal) {
      nextPage();
    } else {
      toast.error('Please select a goal');
    }
  };

  return (
    <div className="md:p-12 p-3 goals mx-auto bg-[#BEFFA7] transition-opacity">
      <div>
        <div className="font-jakarta">
          <h1 className="md:text-2xl font-medium mb-6 leading-8">
            What are your health and wellness goals? (Check all that apply)
          </h1>
          {/* <p className="mb-4">Tell us what your goals for signing up are.</p> */}
        </div>
        <div className="flex flex-col md:gap-3 gap-1">
          {dashboardhero.map(({ title }) => (
            <GoalCheckbox key={title} label={title} data={title} />
          ))}
          {/* <GoalCheckbox label="Gain Weight" data="gain_Weight" />
                    <GoalCheckbox label="Maintain Weight" data="maintain_Weight" />
                    <GoalCheckbox label="Start a fitness journey" data="fitness" />
                    <GoalCheckbox label="Improve Muscle tone" data="muscle_tone" />
                    <GoalCheckbox label="Boost Energy Levels" data="boost_energy_level" />
                    <GoalCheckbox label="Manage Stress" data="manage_stress" />
                    <GoalCheckbox label="Improve Cardiovascular Health" data="cardio_health" />
                    <GoalCheckbox label="Just to Eat Healthy" data="eat_healthy" /> */}
        </div>
      </div>
      <p className=" font-medium  text-xl md:text-4xl text-center mt-4 text-[#0C2503]">Just a little more info!</p>
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

export default Goals;
