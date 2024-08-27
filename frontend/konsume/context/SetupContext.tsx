import React, { createContext, useContext, useState } from 'react';
import { SetupContextType, SetupProviderProps } from '../@types';
import Cookies from 'js-cookie';

const SetupContext = createContext<SetupContextType | undefined>(undefined);

export const SetupProvider: React.FC<SetupProviderProps> = ({ children }) => {
  const [userGoal, setUserGoal] = useState<string>('');
  const [possibleDiseases, setPossibleDiseases] = useState([]);
  const [nationality, setNationality] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [name, setName] = useState<string | undefined>(Cookies.get('konsumeUsername'));
  const [diet, setDiet] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userID, setUserID] = useState<number>();
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <SetupContext.Provider
      value={{
        userGoal,
        setUserGoal,
        possibleDiseases,
        setPossibleDiseases,
        name,
        setName,
        nationality,
        age,
        gender,
        weight,
        setAge,
        setGender,
        setWeight,
        setNationality,
        currentPage,
        setCurrentPage,
        nextPage,
        previousPage,
        diet,
        setDiet,
        userID,
        setUserID,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};
export default SetupContext;

export const useSetupContext = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetupContext must be used within a SetupProvider');
  }
  return context;
};
