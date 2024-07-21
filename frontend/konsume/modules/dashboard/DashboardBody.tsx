import React, { useContext, useEffect, useState } from "react";
import star from "../../public/assets/star2.png";
import star3 from "../../public/assets/star3.png";
import star4 from "../../public/assets/star4.png";
import star5 from "../../public/assets/star5.png";
import scanner from "../../public/assets/scannerr.png";
import progress from "../../public/assets/progresss.png";
import gemini from "../../http/gemini";
import { toast } from "react-toastify";
// import VanillaTilt from 'vanilla-tilt'
import SetupContext, { useSetupContext } from "../../context/SetupContext";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/router";

const DashboardBody = () => {
  const { name, age, weight, userGoal, possibleDiseases, diet } =
    useSetupContext();
  // const stringdisease = userDiseases.join(, )
  const qq = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    userGoal
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. Please give me like 3 or more recommended food sources. Not more than 30 words`;
  const qq2 = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. Please give me like 3 or more types of food i should avoid. Not more than 30 words`;
  const proq = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. What is the recommended range of percent of protein i should eat, it must be exactly in this format i.e 30-45% do not include anything apart from the percentage`;
  const carbq = `My name is ${Cookies.get(
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
  const fatq = `My name is ${Cookies.get("name")} I am ${Cookies.get(
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
  )} and i am ${Cookies.get("diet")}. Generate a random ${Cookies.get(
    "height"
  )} breakfast meal fit for my health in this format e.g Rice and stew or amala don't tell me any other thing just give me the food name, no other thing said`;
  const lunchQuery = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get("diet")}. Generate a random ${Cookies.get(
    "height"
  )} lunch meal fit for my health in this format e.g jollof rice don't tell me any other thing just give me the food name, no other thing said`;
  const dinnerQuery = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get("diet")}. Generate a random ${Cookies.get(
    "height"
  )} dinner fit for my health in this format e.g amala and ewedu don't tell me any other thing just give me the food name, no other thing said`;

  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  const [query, setQuery] = useState(qq);
  const [query2, setQuery2] = useState(qq2);
  const [query3, setQuery3] = useState(proq);
  const [query4, setQuery4] = useState(carbq);
  const [query5, setQuery5] = useState(fatq);

  const [answer, setAnswer] = useState();
  const [answer2, setAnswer2] = useState();

  const [proteinPercent, setProteinPercent] = useState();
  const [carbPercent, setCarbPercent] = useState();
  const [fats, setFats] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Debounced API calls to prevent too many requests
    const debounceMakeRequest = debounce(makeRequest, 2000);
    debounceMakeRequest();

    // Sequentially call functions with delays to avoid request bursts
    const timer1 = setTimeout(() => {
      makeRequestAvoidFood();
    }, 2000);

    const timer2 = setTimeout(() => {
      getRandomMeals();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Debounce function to limit the rate of function execution
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // Retry function with exponential backoff
  const retry = async (fn: Function, retries = 6, delay = 3000) => {
    try {
      await fn();
    } catch (error) {
      if (retries > 1) {
        setTimeout(() => {
          retry(fn, retries - 1, delay * 2);
        }, delay);
      } else {
        console.error("Max retries reached:", error);
      }
    }
  };

  // API call functions
  const makeRequest = async () => {
    await retry(async () => {
      console.log("hii");
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query }] }],
      });
      setAnswer(data.candidates[0].content.parts[0].text);
      console.log(data);
      console.log("done");
      console.log(query);
    });
  };

  const makeRequestAvoidFood = async () => {
    await retry(async () => {
      setLoading(true);
      console.log("hii");
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query2 }] }],
      });

      const protein = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query3 }] }],
      });

      setTimeout(async () => {
        const carbs = await gemini.post("/gemini-pro:generateContent", {
          contents: [{ parts: [{ text: query4 }] }],
        });
        const fats = await gemini.post("/gemini-pro:generateContent", {
          contents: [{ parts: [{ text: query5 }] }],
        });

        setAnswer2(data.candidates[0].content.parts[0].text);
        setProteinPercent(protein?.data.candidates[0].content.parts[0].text);
        setCarbPercent(carbs?.data.candidates[0].content.parts[0].text);
        setFats(fats?.data.candidates[0].content.parts[0].text);
        setLoading(false);
      }, 2000);

      console.log(data);
      console.log("done");
      console.log(query2);
    });
  };

  const getRandomMeals = async () => {
    await retry(async () => {
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

      console.log(data);
      console.log("meals recipe");
      console.log(breakfast);
      console.log(lunch);
      console.log(dinner);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setBreakfast("Nutritious bean cake high in protein and fiber.");
    }, 2000);
  }, []);

  const router = useRouter();

  const handleNavigate = (meal: string) => {
    router.push({
      pathname: "/dashboard/meal-details",
      query: { breakfast: encodeURIComponent(meal) },
    });
  };

  // const element = document.querySelectorAll(".js-tilt");
  // VanillaTilt.init(element);
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-3 px-5">
      <div className="grid grid-rows-2 gap-2 font-jakarta">
        <div className="bg-[#8C77EC] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xs text-white">
              Foods to Consume <br />
              (Percentage of Daily Intake)
            </p>
            <Image src={star} alt="star" />
          </div>
          {loading ? (
            <LoaderCircle className="my-auto animate-spin mx-auto" />
          ) : (
            <div className="gap-2 flex flex-col ">
              <div className="justify-between flex bg-[#D2E1F9] p-3 rounded-lg">
                <p className=" font-normal text-xs">Protein</p>
                <p className=" font-bold text-xs text-[#FFC501]">
                  {proteinPercent}
                </p>
              </div>
              <div className="justify-between flex bg-[#D2F9E8] p-3 rounded-lg">
                <p className=" font-normal text-xs">Carbohydrates</p>
                <p className=" font-bold text-xs text-[#FFC501]">
                  {carbPercent}
                </p>
              </div>
              <div className="justify-between flex bg-[#F7F9D2] p-3 rounded-lg">
                <p className=" font-normal text-xs">Healthy Fats</p>
                <p className=" font-bold text-xs text-[#FFC501]">{fats}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#FF004D] p-4 rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center mb-5">
            <p className=" font-bold text-xs">Food to avoid</p>
            <Image src={star4} alt="star" />
          </div>
          {loading ? (
            <LoaderCircle className="my-auto animate-spin mx-auto" />
          ) : (
            <ul className=" text-xs font-medium">{answer2}</ul>
          )}
        </div>
      </div>

      <div className="grid grid-rows-2 gap-2 cursor-pointer font-jakarta">
        <div className="bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco ">
          <div className="flex justify-between items-center mb-5">
            <p className=" font-bold text-xs text-[#8C77EC]">
              Recommended Food Sources
            </p>
            <Image src={star3} alt="star" />
          </div>
          {loading ? (
            <LoaderCircle className="my-auto animate-spin mx-auto" />
          ) : (
            <ul className=" text-xs font-medium text-[#286711]">{answer}</ul>
          )}
        </div>
        <Link href="/scanner">
          <div className="bg-[#B3C7E4] p-4 rounded-2xl js-tilt h-full mealreco">
            <div className="flex justify-between items-center mb-5">
              <p className=" font-bold text-xs text-[#0C2503]">
                Try Out Scanner
              </p>
              <Image src={scanner} alt="scanner" />
            </div>
            <p className=" font-normal text-[#0C2503]">
              Upload a food picture, and our AI analyzes it for nutritional
              info, allergens, and health goal alignment.
            </p>
          </div>
        </Link>
      </div>

      <div className="grid grid-rows-1 gap-2">
        <div className="bg-[#767EE1] p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco">
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xs text-white font-jakarta">
              Today&apos;s Meal <br />
              Recommendation
            </p>
            <Image src={star5} alt="star" />
          </div>

          <div className=" bg-[#FFFFFF] opacity-70 text-[#8C77EC] font-medium text-xs rounded-lg py-[9.5px] px-[32.5px] flex items-center justify-center">
            Click on each meal for more info
          </div>
          <div
            onClick={() => handleNavigate(breakfast)}
            className="justify-between flex flex-col min-h-[117px] bg-[#D2F9E8] p-3 rounded-lg opacity-70"
          >
            <div className="flex justify-between">
              <p className="text-[#0C2503] font-bold text-xs">Breakfast</p>
              <p className="text-[#FFC501] font-medium text-[11px] leading-4 ">
                View Recipe and Details
              </p>
            </div>
            <div className="flex justify-between flex-col">
              <p className="text-[#1E5E08] font-bold text-sm">{breakfast}</p>
              {/* <p className='text-[#0C2503] font-medium text-[10px] leading-3'>Nutritious bean cake high in protein and
                fiber.</p> */}
            </div>
          </div>

          <div
            onClick={() => handleNavigate(lunch)}
            className="justify-between flex flex-col min-h-[117px] bg-[#D2F9E8] p-3 rounded-lg opacity-70"
          >
            <div className="flex justify-between">
              <p className="text-[#0C2503] font-bold text-xs">Lunch</p>
              <p className="text-[#FFC501] font-medium text-[11px] leading-4 font-jakarta">
                View Recipe and Details
              </p>
            </div>
            <div className="flex justify-between flex-col">
              <p className="text-[#1E5E08] font-bold text-sm">{lunch}</p>
              {/* <p className='text-[#0C2503] font-medium text-[10px] leading-3'>Nutritious bean cake high in protein and
                fiber.</p> */}
            </div>
          </div>

          <div
            onClick={() => handleNavigate(dinner)}
            className="justify-between flex flex-col min-h-[117px] bg-[#D2F9E8] p-3 rounded-lg opacity-70"
          >
            <div className="flex justify-between">
              <p className="text-[#0C2503] font-bold text-xs">Dinner</p>
              <p className="text-[#FFC501] font-medium text-[11px] leading-4 font-jakarta">
                View Recipe and Details
              </p>
            </div>
            <div className="flex justify-between flex-col">
              <p className="text-[#1E5E08] font-bold text-sm">{dinner}</p>
              {/* <p className='text-[#0C2503] font-medium text-[10px] leading-3'>Nutritious bean cake high in protein and
                fiber.</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
