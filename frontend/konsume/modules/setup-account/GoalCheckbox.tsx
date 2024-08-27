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
    <div className=" font-jakarta">
      <div className="flex items-center me-4 md:gap-6 gap-4">
        <input
          id="inline-radio"
          type="radio"
          onChange={getValue}
          value={label}
          name="inline-radio-group"
          checked={userGoal === label}
          className="md:w-7 md:h-7 w-6 h-6 accent-[green] checked:text-[red] checked:out"
        />
        <label htmlFor="inline-radio" className="md:text-[22.26px] text-[16px]  text-[#0C2503] font-medium">
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
