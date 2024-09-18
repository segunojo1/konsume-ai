import React, { useState, useEffect } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { GoalCheckboxProps } from '../../@types';

const DietCheckbox: React.FC<GoalCheckboxProps> = ({ label, data }) => {
  const { diet, setDiet } = useSetupContext();
  const [otherInput, setOtherInput] = useState(''); // State to track the "Other" input value

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiet(value);
    
    if (value === "Other") {
      // If "Other" is selected, clear the otherInput value
      setOtherInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInput(e.target.value);
  };

  const handleInputBlur = () => {
    // Update diet with the input value when the input loses focus
    if (data === "Other" && otherInput.trim() !== "") {
      setDiet(otherInput);
    }
  };

  useEffect(() => {
    console.log(diet);
  }, [diet]);

  return (
    <div className="w-fit">
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
        <div className='flex items-center md:gap-6 gap-4'>
          <input
            id={`radio-${label}`}
            type="radio"
            onChange={handleRadioChange}
            value={label}
            name="inline-radio-group"
            checked={diet === label}
            className="md:min-w-7 md:h-7 min-w-6 h-6 accent-[green]"
          />
          <label htmlFor={`radio-${label}`} className="md:text-[22.26px] text-[16px] text-[#0C2503] font-medium">
            {label}
          </label>
        </div>
        {data === 'Other' && (
          <Input
            className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] h-[40px]"
            placeholder="Specify"
            value={otherInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur} // Update state when the input loses focus
          />
        )}
      </div>
    </div>
  );
};

export default DietCheckbox;
