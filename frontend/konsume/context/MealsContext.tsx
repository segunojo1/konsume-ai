import React, { createContext, useEffect, useRef, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';
import { axiosKonsumeInstance } from '@/http/konsume';
import { retry } from '@/helpers/retryapi';

const MealsContext = createContext<MainLayoutContextProps>({} as any);
export default MealsContext;

export function MealsContextProvider({ children }: { children: React.ReactNode }) {
    const [recommendedMeals, setRecommendedMeals] = useState([]);
    const [user, setUser] = useState<string | undefined>();

    const dataFetchedRef = useRef(false);

useEffect(() => {
    const fetchMeals = async () => {
        try {
            const { data } = await axiosKonsumeInstance.get('/api/ChatBot/GenerateMeals', {
                params: { profileId: Cookies.get('userid') },
            });
            setRecommendedMeals(data.$values);

            if (data.$values.length < 2) {
                console.log('Retrying due to insufficient meal data...');
                await retry(fetchMeals);
            } else {
                console.log('Meals fetched successfully:', data.$values);
                localStorage.setItem('recommendedMeals', JSON.stringify(data.$values));
            }
        } catch (error) {
            console.error('Fetch Meals Error:', error);
        }
    };

    const checkAndFetchMeals = async () => {
        const lastFetchDate = localStorage.getItem('lastFetchDate');
        const today = new Date().toISOString().split('T')[0];

        if (lastFetchDate !== today) {
            await fetchMeals();
            localStorage.setItem('lastFetchDate', today);
        } else {
            const cachedMeals = JSON.parse(localStorage.getItem('recommendedMeals') || '[]');
            setRecommendedMeals(cachedMeals);
        }

        setMidnightTimer(fetchMeals);
    };

    if (!dataFetchedRef.current) {
        checkAndFetchMeals();
        dataFetchedRef.current = true;
    }
}, [setRecommendedMeals]);

// Set a timer to fetch new data at the next 12:00 AM
const setMidnightTimer = (fetchMeals: any) => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
        fetchMeals();
        localStorage.setItem('lastFetchDate', new Date().toISOString().split('T')[0]);
        setMidnightTimer(fetchMeals); // Set the timer again for the next day
    }, timeUntilMidnight);
};


  const contextValue: any = {
    recommendedMeals, setRecommendedMeals, dataFetchedRef, setMidnightTimer, user, setUser
  };

  return <MealsContext.Provider value={contextValue}>{children}</MealsContext.Provider>;
}
