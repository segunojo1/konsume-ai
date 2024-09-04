import React, { createContext, useEffect, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';

const BlogContext = createContext<MainLayoutContextProps>({} as any);
export default BlogContext;

export function BlogContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('home');
  const [toggled, setToggled] = useState<boolean>(false);
  const [userMessage, setUserMessage] =useState('');
  const [name, setName] = useState<string | undefined>();

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

  return <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>;
}
