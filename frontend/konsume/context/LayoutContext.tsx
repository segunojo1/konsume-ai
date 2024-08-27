import React, { createContext, useEffect, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';

const MainLayoutContext = createContext<MainLayoutContextProps>({} as any);
export default MainLayoutContext;

export function MainLayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('home');
  const [toggled, setToggled] = useState<boolean>(false);
  const [userMessage, setUserMessage] =useState('');
  const [name, setName] = useState<string | undefined>(Cookies.get('konsumeUsername'));

  useEffect(() => {

    const username = Cookies.get('konsumeUsername')
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
