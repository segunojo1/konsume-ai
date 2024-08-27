import React, { useContext, useEffect, useState } from "react";
import veg from "../../public/assets/kons.png";
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import { dashboardhero } from "./dashboardhero";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import MainLayout from "@/components/Layout/MainLayout";
import SearchBar from "@/components/ui/SearchBar";

const DashboardHead = () => {
  const { name, age, weight, userGoal, possibleDiseases } = useSetupContext();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<string | undefined>();
  useEffect(() => {
    setUser(Cookies.get('konsumeUsername'))
  }, [])
  const threeWordDietPrompt = `Hello, I was born ${Cookies.get(
    "age"
  )} , I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )}. Please generate a three word diet for me e.g High protein diet, just suggest a hypothetical name`;
  const [query, setQuery] = useState(threeWordDietPrompt);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    // Ensure this only runs on the client
    setIsClient(!isClient);
  }, []);


  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      console.log("hii");
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query }] }],
      });
      setAnswer(data.candidates[0].content.parts[0].text);
      console.log(data);
      console.log("done");
      console.log(query);
    } catch (error) {
      console.error(error);
    }
  };

  const textForUserGoal = dashboardhero
    .filter(({ title }) => title == userGoal)
    .map(({ text }) => text);
  console.log(textForUserGoal);

  return (
    <div className="font-satoshi mb-9 ">
      <div className='flex justify-between w-full '>

          <div className="relative w-fit">
            <Image src='/multipleline.svg' alt='multi line' height={141} width={98} className='  absolute bottom-0 top-0 my-auto right-0 z-0' />
            <h1 className="md:text-desktop-heading4 text-[28px]/[40px] font-bold z-[999] relative">Hello, {user ? user : ".."}</h1>
          </div>      

        <SearchBar />
      </div>
    </div>
  );
};

export default DashboardHead;
