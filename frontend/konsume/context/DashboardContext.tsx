import React, { createContext, useEffect, useRef, useState } from 'react';
import { MainLayoutContextProps } from '../@types';
import Cookies from 'js-cookie';
import { useSetupContext } from './SetupContext';
import { retry } from '@/helpers/retryapi';
import gemini from '@/http/gemini';

const DashboardContext = createContext({} as any);
export default DashboardContext;

export function DashboardContextProvider({ children }: { children: React.ReactNode }) {
  const { name, age, weight, userGoal, possibleDiseases, diet } = useSetupContext();
  const proteinIntakeRange = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. What is the recommended range of percent of protein i should eat, it must be exactly in this format i.e 30-45% do not include anything apart from the percentage`;

  const carbIntakeRange = `My name is ${Cookies.get(
    "konsumeUsername"
  )} I am ${Cookies.get("age")} years old and ${Cookies.get(
    "weight"
  )}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. What is the recommended range of percent of fats i should eat, it must be exactly in this format i.e 30-45% do not include anything apart from the percentage. just recommend i know u ae not a doctor`;

  const fatIntakeRange = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. What is the recommended range of percent of carbs i should eat, it must be exactly in this format i.e 30-45% do not include anything apart from the percentage`;

  const breakfastQuery = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    userGoal
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get("diet")}. Generate a random Nigerian breakfast meal fit for my health in this format e.g Rice and stew or amala don't tell me any other thing just give me the food name, no other thing said`;
  const lunchQuery = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get("diet")}. Generate a random Nigerian lunch meal fit for my health in this format e.g jollof rice don't tell me any other thing just give me the food name, no other thing said`;
  const dinnerQuery = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get("diet")}. Generate a random Nigerian dinner fit for my health in this format e.g amala and ewedu don't tell me any other thing just give me the food name, no other thing said`;


  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [nutritionTea, setNutritionTea] = useState("");


  const [answer, setAnswer] = useState();
  const [answer2, setAnswer2] = useState();

  const [proteinPercent, setProteinPercent] = useState();
  const [carbPercent, setCarbPercent] = useState();
  const [fats, setFats] = useState();
  const [loading, setLoading] = useState(false);

  const dataFetchedRef = useRef(false);

  const fetchMeals = async () => {
    try {
      const { data } = await gemini.post("/gemini-1.5-flash:generateContent", {
        contents: [{ parts: [{ text: breakfastQuery }] }],
      });

      const lun = await gemini.post("/gemini-1.5-flash:generateContent", {
        contents: [{ parts: [{ text: lunchQuery }] }],
      });

      const din = await gemini.post("/gemini-1.5-flash:generateContent", {
        contents: [{ parts: [{ text: dinnerQuery }] }],
      });
      const nutritiontea = await gemini.post("/gemini-1.5-flash:generateContent", {
        contents: [{
          parts: [{
            text: `Generate a random nutrition fact of about 30 words i.e like a did you know fact especially for someone with ${Cookies.get(
              "possibleDiseases"
            )}`
          }]
        }],
      });
      setBreakfast(data.candidates[0].content.parts[0].text);
      setLunch(lun.data.candidates[0].content.parts[0].text);
      setDinner(din.data.candidates[0].content.parts[0].text);
      setNutritionTea(nutritiontea.data.candidates[0].content.parts[0].text)


      console.log('nutrition fact fetched successfully:', nutritiontea.data.candidates[0].content.parts[0].text);
      if (typeof window !== 'undefined') {
        localStorage.setItem('breakfast', JSON.stringify(data.candidates[0].content.parts[0].text));
        localStorage.setItem('lunch', JSON.stringify(lun.data.candidates[0].content.parts[0].text));
        localStorage.setItem('dinner', JSON.stringify(din.data.candidates[0].content.parts[0].text));
        localStorage.setItem('nutritiontea', JSON.stringify(nutritiontea.data.candidates[0].content.parts[0].text));
      }

    } catch (error) {
      console.error('Fetch Meals Error:', error);
    }
  };
  // Set a timer to fetch new data at the next 12:00 AM
  const setMidnightTimer = (fetchMeals: any) => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

    const timeUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      fetchMeals();
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastFetchDate', new Date().toISOString().split('T')[0]);
      }
      setMidnightTimer(fetchMeals); // Set the timer again for the next day
    }, timeUntilMidnight);
  }
  const getRandomMeals = async () => {
    if (typeof window !== 'undefined') {
      const lastFetchDate = localStorage.getItem('lastDashboardFetchDate');
      const today = new Date().toISOString().split('T')[0];

      if (lastFetchDate !== today) {
        await fetchMeals();
        localStorage.setItem('lastDashboardFetchDate', today);
      } else {
        const cachedBreakfast = JSON.parse(localStorage.getItem('breakfast') || '[]');
        const cachedLunch = JSON.parse(localStorage.getItem('lunch') || '[]');
        const cachedDinner = JSON.parse(localStorage.getItem('dinner') || '[]');
        const cachedNutrition = JSON.parse(localStorage.getItem('nutritiontea') || '[]');
        setBreakfast(cachedBreakfast);
        setLunch(cachedLunch);
        setDinner(cachedDinner);
        setNutritionTea(cachedNutrition)

      }
    }

    setMidnightTimer(fetchMeals);
  };

  if (!dataFetchedRef.current) {
    getRandomMeals();
    dataFetchedRef.current = true;
  }

  // const getRandomMeals = async () => {
  //   try {

  //     setLoading(true)
  //     const { data } = await gemini.post("/gemini-1.5-flash:generateContent", {
  //       contents: [{ parts: [{ text: breakfastQuery }] }],
  //     });

  //     const lun = await gemini.post("/gemini-1.5-flash:generateContent", {
  //       contents: [{ parts: [{ text: lunchQuery }] }],
  //     });

  //     const din = await gemini.post("/gemini-1.5-flash:generateContent", {
  //       contents: [{ parts: [{ text: dinnerQuery }] }],
  //     });

  //     setBreakfast(data.candidates[0].content.parts[0].text);
  //     setLunch(lun.data.candidates[0].content.parts[0].text);
  //     setDinner(din.data.candidates[0].content.parts[0].text);
  //     setLoading(false);
  //     console.log(data);
  //     console.log("meals recipe");
  //     console.log(breakfast);
  //     console.log(lunch);
  //     console.log(dinner);
  //   } catch (error) {
  //     console.log(error);

  //   }
  // };
  useEffect(() => {

    const username = Cookies.get('konsumeUsername')

  }, [])

  const contextValue: any = {
    breakfast, setBreakfast, lunch, setLunch, dinner, setDinner, breakfastQuery, lunchQuery, dinnerQuery, loading, setLoading, getRandomMeals, nutritionTea
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
}
