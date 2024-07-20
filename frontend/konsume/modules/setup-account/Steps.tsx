import React from 'react';
import StepsCircle from './StepsCircle';

const Steps = () => {
  return (
    <div className="flex mb-5 mt-3">
      <StepsCircle number={1} />
      <StepsCircle number={2} />
      <StepsCircle number={3} />
      <StepsCircle number={4} />
    </div>
  );
};

export default Steps;
