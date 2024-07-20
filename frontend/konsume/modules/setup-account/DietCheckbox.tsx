import React from 'react';
import { useEffect } from 'react';
import SetupContext, { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { GoalCheckboxProps } from '../../@types';

const DietCheckbox: React.FC<GoalCheckboxProps> = ({ label, data }) => {
  const { diet, setDiet } = useSetupContext();

  const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiet(e.target.value);
  };
  useEffect(() => {
    console.log(diet);
  }, [diet]);

  return (
    <div className="">
      <div className="flex items-center me-4 gap-2">
        <input
          id="inline-radio"
          type="radio"
          onChange={getValue}
          value={label}
          name="inline-radio-group"
          checked={diet === label}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
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

export default DietCheckbox;
