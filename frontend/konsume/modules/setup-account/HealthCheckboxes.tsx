import React, { useEffect } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { HealthProps } from '../../@types';
import Image from 'next/image';
import on from '../../public/checked.svg'

const HealthCheckboxes: React.FC<HealthProps> = ({ label, specify }) => {
  const { possibleDiseases, setPossibleDiseases } = useSetupContext();
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (checkboxValue === "Other") {
      if (isChecked) {
        // If "Other" is checked, uncheck all others and set value to "headache"
        setPossibleDiseases(["headache"]);
      } else {
        // If "Other" is unchecked, clear the selection
        setPossibleDiseases([]);
      }
    } else if (checkboxValue === "None") {
      if (isChecked) {
        // If "none" is checked, uncheck all others and set value to "none"
        setPossibleDiseases(["None"]);
      } else {
        // If "none" is unchecked, clear the selection
        setPossibleDiseases([]);
      }
    } else if (isChecked) {
      // If any other checkbox is checked, add its value to the array
      setPossibleDiseases((prevState: any) => [...prevState, checkboxValue]);
    } else {
      // If checkbox is unchecked, remove its value from the array
      setPossibleDiseases((prevState: any) =>
        prevState.filter((item: any) => item !== checkboxValue)
      );
    }

    console.log(possibleDiseases);
  };

  useEffect(() => {
    console.log(possibleDiseases);
  }, [possibleDiseases]);
  return (
    <label htmlFor="checkbox-in-form" className="flex md:items-center flex-col md:flex-row md:gap-6 gap-4 cursor-pointer w-fit">
      <div className='flex items-center md:gap-6 gap-4 cursor-pointer'>
        <input
          onChange={handleCheckbox}
          checked={
            label === "Other"
              ? possibleDiseases.includes("headache")
              : possibleDiseases.includes(label)
          }
          disabled={
            label !== "Other" && label !== "None" && (possibleDiseases.includes("headache") || possibleDiseases.includes("None"))
          }
          type="checkbox"
          value={label}
          style={
            possibleDiseases.includes(label) || (label === "Other" && possibleDiseases.includes("headache"))
              ? { backgroundImage: `url(${on.src})` }
              : {}
          }
          className={`min-w-6 h-6 appearance-none cursor-pointer border bg-primary-bg-100 rounded-md checked:bg-center `}
          id="checkbox-in-form"
        />
        <span className="md:text-[22.26px] text-[16px]  text-[#0C2503] font-medium">
          {label}
        </span>
        {/* <Image width={50} height={50} src='/on.png' alt='on'/> */}
      </div>
      {specify == 'true' && (
        <Input
          className=" xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] h-[40px]"
          placeholder="Specify"
        />
      )}
    </label>
  );
};

export default HealthCheckboxes;
