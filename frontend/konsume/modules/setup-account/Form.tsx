import React from 'react';
import BioData from './BioData';
import Goals from './Goals';
import HealthConditions from './HealthConditions';
import DietType from './DietType';
import { useSetupContext } from '../../context/SetupContext';

const Form = () => {
  const { currentPage, setCurrentPage } = useSetupContext();
  switch (currentPage) {
    case 1:
      return <BioData />;
      break;
    case 2:
      return <Goals />;
    case 3:
      return <HealthConditions />;
    case 4:
      return <DietType />;
    default:
      return null;
      break;
  }
};

export default Form;
