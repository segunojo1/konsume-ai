import React, { useEffect } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { HealthProps } from '../../@types';

const HealthCheckboxes: React.FC<HealthProps> = ({ label, specify }) => {
  const { possibleDiseases, setPossibleDiseases } = useSetupContext();
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    // If checkbox is checked, add its value to the selectedCheckboxes array
    if (isChecked) {
      setPossibleDiseases((prevState: any) => [...prevState, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove its value from the selectedCheckboxes array
      setPossibleDiseases((prevState: any) => prevState.filter((item: any) => item !== checkboxValue));
    }

    console.log(possibleDiseases);
  };

  useEffect(() => {
    console.log(possibleDiseases);
  }, [possibleDiseases]);
  return (
    <label htmlFor="checkbox-in-form" className="flex p-3 cursor-pointer gap-2 rounded-md text-sm w-fit items-center">
      <input
        onChange={handleCheckbox}
        checked={possibleDiseases.includes(label)}
        type="checkbox"
        value={label}
        className="w-5 h-5 appearance-none cursor-pointer border border-[#FFC501] rounded-md checked:bg-no-repeat checked:bg-center checked:border-[#FFC501] checked:bg-[#FFC501]"
        id="checkbox-in-form"
      />
      <span className=" md:text-[24px] leading-[31px] text-[#0C2503] ml-2 font-medium font-jakarta w-full">
        {label}
      </span>
      {specify == 'true' && (
        <Input
          className=" rounded-[40px] border-[0.9px] border-[#FFC501] bg-[#D6FBC4] py-[2.7px] px-[28.3px] text-[#032902B2] font-normal leading-[23px]"
          placeholder="Specify"
        />
      )}
    </label>
  );
};

export default HealthCheckboxes;
