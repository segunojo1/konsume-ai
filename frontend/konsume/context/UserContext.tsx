import React, { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { axiosKonsumeInstance } from '@/http/konsume';
import { useRouter } from 'next/router';

const UserContext = createContext<any>(undefined);

export const UserProvider: React.FC<any> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const router = useRouter();
  const getUserDetails = async () => {
  try {
    const {data} = await axiosKonsumeInstance.get(`/api/users/users/${Cookies.get('userid')}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('ktn')}`,
      },
      params: {
        id: Cookies.get('userid')
      }
    })
    if (data?.fullName) {
      setUsername(data.fullName);
      console.log(username);
      
    } else {
      setUsername('');
    }
    console.log(data);
  } catch (error) {
    console.log(error);
    setUsername('');
  }
}
useEffect(() => {
  getUserDetails()
}, [router.pathname])
  return (
    <UserContext.Provider
      value={{
        username,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvideProps');
  }
  return context;
};
