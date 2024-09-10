import React, { useState } from 'react';

interface MultiStepProgressBarProps {
  currentStep: number;
}

const MultiStepProgressBar = ({currentStep}:MultiStepProgressBarProps) => {
  const totalSteps = 4;


  return (
    <div className="progress-lines-container absolute right-24 top-0 bottom-0 my-auto z-10">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`progress-line bg-success-100 ${currentStep === step ? ' bg-success-200  h-[40%]' : 'h-[20%]'}`}
        ></div>
      ))}
    </div>
  );
};

export default MultiStepProgressBar;
