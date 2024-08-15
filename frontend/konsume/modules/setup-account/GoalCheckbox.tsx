import React from 'react';
import { useEffect } from 'react';
import SetupContext, { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { GoalCheckboxProps } from '../../@types';

const GoalCheckbox: React.FC<GoalCheckboxProps> = ({ label, data }) => {
  const { userGoal, setUserGoal } = useSetupContext();

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserGoal(e.target.value);
  };
  useEffect(() => {
    console.log(userGoal);
  }, [userGoal]);

  return (
    <div className="">
      <div className="flex items-center me-4 gap-2">
        <Input
          id="inline-radio"
          type="radio"
          onChange={getValue}
          value={label}
          name="inline-radio-group"
          checked={userGoal === label}
          className=""
        />
        <label htmlFor="inline-radio" className="md:text-[25px] leading-8 text-[#0C2503] font-medium font-jakarta">
          {label}
        </label>
        {data == 'd' && (
          <Input
            className=" rounded-[40px] border-[0.9px] border-[#FFC501] bg-[#D6FBC4] py-[2.7px] px-[28.3px] text-[#032902B2] font-normal leading-[23px]"
            placeholder="Specify"
          />
        )}
      </div>
    </div>
  );
};

export default GoalCheckbox;
