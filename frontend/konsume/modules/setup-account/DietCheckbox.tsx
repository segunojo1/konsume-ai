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
    <div className="w-fit">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
        <div className='flex items-center md:gap-6 gap-4'>
          <input
            id="inline-radio"
            type="radio"
            onChange={getValue}
            value={label}
            name="inline-radio-group"
            checked={diet === label}
            className="md:min-w-7 md:h-7 min-w-6 h-6 accent-[green] "
          />
          <label htmlFor="inline-radio" className="md:text-[22.26px] text-[16px]  text-[#0C2503] font-medium">
            {label}
          </label>
        </div>
        {data == 'Other' && (
          <Input
            className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] h-[40px]"
            placeholder="Specify"
          />
        )}
      </div>
    </div>
  );
};

export default DietCheckbox;
