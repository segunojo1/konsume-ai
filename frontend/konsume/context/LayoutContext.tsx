import React, { createContext, useState } from 'react';
import { MainLayoutContextProps } from '../@types';

const MainLayoutContext = createContext<MainLayoutContextProps>({} as any);
export default MainLayoutContext;

export function MainLayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('home');
  const [toggled, setToggled] = useState<boolean>(false);
  const [userMessage, setUserMessage] =useState('');

  const contextValue: MainLayoutContextProps = {
    activePage,
    setActivePage,
    toggled, 
    setToggled,
    userMessage,
    setUserMessage
  };

  return <MainLayoutContext.Provider value={contextValue}>{children}</MainLayoutContext.Provider>;
}
