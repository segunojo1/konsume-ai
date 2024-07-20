import React, { useContext } from 'react';
import Image from 'next/image';
import line from '../../public/assets/line.png';
import { useSetupContext } from '../../context/SetupContext';
import { diettype } from '../dashboard/diettype';
import DietCheckbox from './DietCheckbox';

const DietType = () => {
  const { previousPage } = useSetupContext();
  return (
    <div className="md:p-12 p-3 goals mx-auto bg-[#BEFFA7]">
      <div>
        <div className="font-jakarta">
          <h1 className="md:text-2xl font-medium mb-6 leading-8">What is your diet type</h1>
          {/* <p className="mb-4">Tell us what your goals for signing up are.</p> */}
        </div>
        <div className="flex flex-col md:gap-3 gap-1">
          {diettype.map(({ title }) => (
            <DietCheckbox key={title} label={title} data={title} />
          ))}
          {/* <GoalCheckbox label="Vegan" data= "gain_Weight"/>
                    <GoalCheckbox label="Pascatarian" data= "maintain_Weight"/>
                    <GoalCheckbox label="Keto" data= "fitness"/>
                    <GoalCheckbox label="Paleo" data= "muscle_tone"/>
                    <GoalCheckbox label="Mediterranean" data= "boost_energy_level"/>
                    <GoalCheckbox label="Other" data= "manage_stress"/>
                    <GoalCheckbox label="None" data= "d"/> */}
        </div>
      </div>

      <p className=" font-medium text-xl md:text-4xl text-center mt-4 text-[#0C2503]">Last step!</p>
      <div className="flex gap-5 mx-auto w-fit mt-7">
        <div
          className="w-[50px] h-[50px] border-[2.5px] border-[#FFC501] rounded-[40px] flex items-center justify-center"
          onClick={previousPage}
        >
          <Image alt="line" src={line} width="30" height="30" className="" />
        </div>
      </div>
    </div>
  );
};

export default DietType;
