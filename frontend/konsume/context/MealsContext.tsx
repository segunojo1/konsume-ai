import React, { createContext, useEffect, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';

const MealsContext = createContext<MainLayoutContextProps>({} as any);
export default MealsContext;

export function MealsContextProvider({ children }: { children: React.ReactNode }) {
    const [recommendedMeals, setRecommendedMeals] = useState([]);
  useEffect(() => {

    const username = Cookies.get('konsumeUsername')

    }, [])

  const contextValue: any = {
    recommendedMeals, setRecommendedMeals
  };

  return <MealsContext.Provider value={contextValue}>{children}</MealsContext.Provider>;
}
