import React, { useState, useEffect } from 'react';
import { useSetupContext } from '../../context/SetupContext';
import { Input } from '@/components/ui/input';
import { HealthProps } from '../../@types';

const HealthCheckboxes: React.FC<HealthProps> = ({ label, specify }) => {
  const { possibleDiseases, setPossibleDiseases } = useSetupContext();
  const [otherInput, setOtherInput] = useState(''); // State to track the "Other" input value

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (checkboxValue === "Other") {
      if (isChecked) {
        // If "Other" is checked, set value to "headache" temporarily
        setPossibleDiseases(["headache"]);
      } else {
        // Clear the input and state when "Other" is unchecked
        setOtherInput('');
        setPossibleDiseases([]);
      }
    } else if (checkboxValue === "None") {
      if (isChecked) {
        // Set possibleDiseases to "None" when checked
        setPossibleDiseases(["None"]);
      } else {
        setPossibleDiseases([]);
      }
    } else if (isChecked) {
      setPossibleDiseases((prevState: any) => [...prevState, checkboxValue]);
    } else {
      setPossibleDiseases((prevState: any) =>
        prevState.filter((item: any) => item !== checkboxValue)
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherInput(e.target.value);
  };

  const handleInputBlur = () => {
    // Update possibleDiseases when the input is finished
    if (otherInput.trim() !== "") {
      setPossibleDiseases([otherInput]);
    }
  };

  useEffect(() => {
    console.log(possibleDiseases);
  }, [possibleDiseases]);

  return (
    <label className="flex md:items-center flex-col md:flex-row md:gap-6 gap-4 cursor-pointer w-fit">
      <div className="flex items-center md:gap-6 gap-4 cursor-pointer">
        <input
          onChange={handleCheckbox}
          checked={
            label === "Other"
              ? possibleDiseases.includes("headache") || possibleDiseases.includes(otherInput)
              : possibleDiseases.includes(label)
          }
          disabled={
            label !== "Other" && label !== "None" && (possibleDiseases.includes("headache") || possibleDiseases.includes("None"))
          }
          type="checkbox"
          value={label}
          className="min-w-6 h-6 appearance-none cursor-pointer border bg-primary-bg-100 rounded-md checked:bg-center"
        />
        <span className="md:text-[22.26px] text-[16px] text-[#0C2503] font-medium">
          {label}
        </span>
      </div>
      {specify === 'true' && label === "Other" && (
        <Input
          className="xl:max-w-[348.9px] font-normal text-[17.44px]/[120%] text-[#8C8CA1] py-[13px] px-[17px] h-[40px]"
          placeholder="Specify"
          value={otherInput}
          onChange={handleInputChange}
          onBlur={handleInputBlur} // Update state when the input loses focus
        />
      )}
    </label>
  );
};

export default HealthCheckboxes;
