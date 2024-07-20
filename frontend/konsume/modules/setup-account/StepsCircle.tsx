import React, { useContext } from 'react';
import SetupContext, { useSetupContext } from '../../context/SetupContext';
import { StepsCircleProps } from '../../@types';

const StepsCircle: React.FC<StepsCircleProps> = ({ number }) => {
  const { currentPage } = useSetupContext();
  return (
    <div
      className={` w-[56px] h-[55px] flex items-center justify-center border-[1.13px] border-[#0C2503] ${
        currentPage == number && 'bg-[#8C77EC]'
      } font-medium text-4xl rounded-full`}
    >
      {number}
    </div>
  );
};

export default StepsCircle;
