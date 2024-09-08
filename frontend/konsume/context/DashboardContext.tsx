import React, { createContext, useEffect, useState } from 'react';
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
      const [query3, setQuery3] = useState(proteinIntakeRange);
      const [query4, setQuery4] = useState(carbIntakeRange);
      const [query5, setQuery5] = useState(fatIntakeRange);
    
      const [breakfast, setBreakfast] = useState("");
      const [lunch, setLunch] = useState("");
      const [dinner, setDinner] = useState("");
    
    
      const [answer, setAnswer] = useState();
      const [answer2, setAnswer2] = useState();
    
      const [proteinPercent, setProteinPercent] = useState();
      const [carbPercent, setCarbPercent] = useState();
      const [fats, setFats] = useState();
      const [loading, setLoading] = useState(false);



      const getRandomMeals = async () => {
        try {
          
          setLoading(true)
            const { data } = await gemini.post("/gemini-1.5-flash:generateContent", {
              contents: [{ parts: [{ text: breakfastQuery }] }],
            });
      
            const lun = await gemini.post("/gemini-1.5-flash:generateContent", {
              contents: [{ parts: [{ text: lunchQuery }] }],
            });
      
            const din = await gemini.post("/gemini-1.5-flash:generateContent", {
              contents: [{ parts: [{ text: dinnerQuery }] }],
            });
      
            setBreakfast(data.candidates[0].content.parts[0].text);
            setLunch(lun.data.candidates[0].content.parts[0].text);
            setDinner(din.data.candidates[0].content.parts[0].text);
            setLoading(false);
            console.log(data);
            console.log("meals recipe");
            console.log(breakfast);
            console.log(lunch);
            console.log(dinner);
        } catch (error) {
          console.log(error);
          
        }
      };
  useEffect(() => {

    const username = Cookies.get('konsumeUsername')

    }, [])

  const contextValue: any = {
    breakfast, setBreakfast, lunch, setLunch, dinner, setDinner, breakfastQuery, lunchQuery, dinnerQuery, loading, setLoading, getRandomMeals
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
}
