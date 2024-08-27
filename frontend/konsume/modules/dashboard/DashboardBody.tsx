import React, { useContext, useEffect, useState } from "react";
import star from "../../public/meal.svg";
import tea from "../../public/teacup.svg";
import progress1 from "../../public/progress1.svg";
import star5 from "../../public/assets/star5.png";
import scanner from "../../public/restaurant.svg";
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
import { Button } from "@/components/ui/button";
import DashboardQuickIcon from "./DashboardQuickIcon";

const DashboardBody = () => {
  const { name, age, weight, userGoal, possibleDiseases, diet } = useSetupContext();

  const recommendedFoodPrompt = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    userGoal
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. Please give me like 3  recommended food sources.`;

  const avoidFoodPrompt = `My name is ${Cookies.get("name")} I am ${Cookies.get(
    "age"
  )} years old and ${Cookies.get("weight")}kg, I am working on ${Cookies.get(
    "userGoal"
  )}, my health conditons are ${Cookies.get(
    "possibleDiseases"
  )} and i am ${Cookies.get(
    "diet"
  )}. Please give me like 3 or more types of food i should avoid. Not more than 30 words`;

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

  const [query, setQuery] = useState(recommendedFoodPrompt);
  const [query2, setQuery2] = useState(avoidFoodPrompt);
  const [query3, setQuery3] = useState(proteinIntakeRange);
  const [query4, setQuery4] = useState(carbIntakeRange);
  const [query5, setQuery5] = useState(fatIntakeRange);

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
    <div className="flex ">
      <div className="flex md:flex-col flex-row justify-between px-5 flex-[.7] text-primarygtext">
        <div className="flex gap-2 text-primarygtext">
          <div className=" flex-[.5] bg-secondary-100 p-5 gap-2 flex flex-col rounded-2xl js-tilt mealreco relative">
            <div className="flex justify-between items-center">
              <p className=" font-bold text-xs text-white">
                Today&apos;s Spotlighted Meal
              </p>
              <Image src={star} alt="star" />
            </div>
            {loading ? (
              <LoaderCircle className="my-auto animate-spin mx-auto" />
            ) : (
              <div className="gap-2 flex flex-col ">
                  <p className=" text-[15px] font-bold">{breakfast}</p>
                <p className='text-color8-700 font-medium text-[11.2px] mb-14'>Nutritious bean cake high in protein and
                  fiber.
                </p>
                <Button className=" bg-base-white text-[#8C77EC] font-bold text-[12px]/[120%] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
                  View Recipe and Details
                </Button>
              </div>
            )}
          </div>

          <div className="flex-[.5] flex flex-col justify-between bg-primary-bg-100 p-4 rounded-2xl js-tilt mealreco">
            <div className="flex justify-between items-center">
              <p className=" font-bold text-xs">Progress Tracker</p>
              <Image src={progress1} alt="progress" />
            </div>
            <Button className=" bg-[#fafafa86] mx-auto mt-10 text-primarygtext font-medium text-xs rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
              <Image src="/icon5.svg" height={27.6} width={27.6} alt="icon" />
              <p className=" text-mobile-caption font-bold">Setup Progress Tracker</p>
            </Button>
          </div>
        </div>

        <div className="flex  justify-between">
          <DashboardQuickIcon text="Chat with FoodieAI" img="/icon4.svg" link="chat" />
          <DashboardQuickIcon text="Open AI scanner" img="/icon4.svg" link="scanner" />
          <DashboardQuickIcon text="Recommended meals" img="/icon4.svg" link="meals" />
          <DashboardQuickIcon text="Resturants" img="/icon4.svg" link="restaurants" />
        </div>

        <div className="flex gap-2 cursor-pointer font-jakarta">
          <div className="bg-[#D6FBC4] p-4 rounded-2xl js-tilt mealreco flex-[.5] ">
            <div className="flex justify-between items-center mb-5">
              <p className=" font-bold text-xs ">
                Restaurant Track
              </p>
              <Image src={scanner} alt="restaurant" />
            </div>
          </div>

          <div className="bg-primary-bg p-4 rounded-2xl js-tilt h-full mealreco flex-[.5]">
            <div className="flex justify-between items-center mb-5">
              <p className=" font-bold ">
                Daily Nutritional Tea
              </p>
              <Image src={tea} alt="tea" />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className=" text-desktop-caption font-bold">"Did You Know"</h1>
              <p className=" italic text-[12px]/[20px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque torto, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque tortorLorem ipsum dolor sit amet, consectetur adipiscing elit. Urna pellentesque.</p>
            </div>
          </div>
        </div>


      </div>


      <div className="bg-color8 p-5 gap-2 flex flex-col rounded-2xl js-tilt  flex-[.4]">
        <div className="flex justify-between items-center">
          <p className=" font-bold text-xs text-white">
            Today&apos;s Spotlighted Meal
          </p>
          <Image src="/breakfast.svg" alt="food" width={33} height={33} />
        </div>

        <Button className=" bg-primarygtext text-primary-bg-100 font-medium text-[12px] rounded-lg py-[11px] px-[32.5px] flex items-center justify-center">
          Open in Timetable
        </Button>
        <div
          onClick={() => handleNavigate(breakfast)}
          className="justify-between flex flex-col min-h-[130px] bg-primary-bg-100 px-3 pt-3 relative rounded-lg opacity-70"
        >
          <div className="flex justify-between">
            <p className="text-primarygtext font-bold text-mobile-caption">Breakfast</p>
          </div>
          <div className="flex justify-between flex-col mb-14">
            <p className="text-[#1E5E08] font-bold text-[15px]">{breakfast}</p>
            <p className='text-color8-700 font-medium text-[11.2px]'>Nutritious bean cake high in protein and
              fiber.
            </p>
          </div>
          <Button className=" bg-base-white text-[#8C77EC] font-bold text-[12px]/[120%] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
            View Recipe and Details
          </Button>
        </div>

        <div
          onClick={() => handleNavigate(lunch)}
          className="justify-between flex flex-col min-h-[130px] bg-primary-bg-100 px-3 pt-3 relative rounded-lg opacity-70"
        >
          <div className="flex justify-between">
            <p className="text-primarygtext font-bold text-mobile-caption">Lunch</p>
          </div>
          <div className="flex justify-between flex-col mb-14">
            <p className="text-[#1E5E08] font-bold text-[15px]">{lunch}</p>
            <p className='text-color8-700 font-medium text-[11.2px]'>Nutritious bean cake high in protein and
              fiber.
            </p>
          </div>
          <Button className=" bg-base-white text-[#8C77EC] font-bold text-[12px]/[120%] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
            View Recipe and Details
          </Button>
        </div>

        <div
          onClick={() => handleNavigate(dinner)}
          className="justify-between flex flex-col min-h-[130px] bg-primary-bg-100 px-3 pt-3 relative rounded-lg opacity-70"
        >
          <div className="flex justify-between">
            <p className="text-primarygtext font-bold text-mobile-caption">Lunch</p>
          </div>
          <div className="flex justify-between flex-col mb-14">
            <p className="text-[#1E5E08] font-bold text-[15px]">{dinner}</p>
            <p className='text-color8-700 font-medium text-[11.2px]'>Nutritious bean cake high in protein and
              fiber.
            </p>
          </div>
          <Button className=" bg-base-white text-[#8C77EC] font-bold text-[12px]/[120%] right-0 absolute bottom-0 rounded-[8.8px] py-[11px] px-[32.5px] flex items-center justify-center">
            View Recipe and Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
