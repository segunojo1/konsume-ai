import React, { createContext, useEffect, useState } from 'react';
import { MainLayoutContextProps } from '../@types';

const MainLayoutContext = createContext<MainLayoutContextProps>({} as any);
export default MainLayoutContext;

export function MainLayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('home');
  const [toggled, setToggled] = useState<boolean>(false);
  const [userMessage, setUserMessage] =useState('');
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {

    const username = sessionStorage.getItem('konsumeUsername')
    setName(username)
    }, [])

  const contextValue: any = {
    activePage,
    setActivePage,
    toggled, 
    setToggled,
    userMessage,
    setUserMessage,
    name
  };

  return <MainLayoutContext.Provider value={contextValue}>{children}</MainLayoutContext.Provider>;
}
