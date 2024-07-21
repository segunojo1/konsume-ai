import React, { useContext, useEffect, useState } from "react";
import veg from "../../../public/assets/kons.png";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { useSetupContext } from "../../../context/SetupContext";
import gemini from "../../../http/gemini";
import { dashboardhero } from "../dashboardhero";
import { useRouter } from "next/router";

const MealHead = () => {
  const router = useRouter();
  const [breakfast, setBreakfast] = useState<string>("");
  useEffect(() => {
    if (router.query.breakfast) {
      setBreakfast(decodeURIComponent(router.query.breakfast as string));
    }
  }, [router.query.breakfast]);
  const { name, age, weight, userGoal, possibleDiseases } = useSetupContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client
    setIsClient(true);
  }, []);
  // const stringdisease = userDiseases.join(, )
  const qq = `Please generate a 10words sentence describing nutrients of the food ${
    router.query.breakfast
  } e.g A healthy, protein-rich ${Cookies.get(
    "height"
  )} delicacy perfect for breakfast`;
  const [query, setQuery] = useState(qq);
  const [answer, setAnswer] = useState("");
  const [q2, setQ2] = useState(
    `What is the calories per serving of ${
      router.query.breakfast
    } recommended for me based on my heath condition ${Cookies.get(
      "possibleDiseases"
    )} just respond with a number in kcal only you must generate a number you can just estimate`
  );
  const [answer1, setAnswer1] = useState("");

  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = async () => {
    try {
      console.log("hii");
      const { data } = await gemini.post("/gemini-pro:generateContent", {
        contents: [{ parts: [{ text: query }] }],
      });
      const calory = await gemini.post("/gemini-1.5-flash:generateContent", {
        contents: [{ parts: [{ text: q2 }] }],
      });
      setAnswer(data.candidates[0].content.parts[0].text);
      setAnswer1(calory.data.candidates[0].content.parts[0].text);
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
    <div className="font-satoshi bg-[#8C77EC] p-5 mt-7 rounded-2xl dashboardhead">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <h1 className=" text-[#D6FBC4] leading-[57px] text-[42px] font-bold">
            {isClient ? breakfast : "..."}
          </h1>
          <p className=" text-sm font-light text-[white]">{answer}</p>
          <p className=" font-medium text-sm text-[white]">
            <span className="text-[#FFFFFF] font-jakarta">
              Calories per serving:{" "}
            </span>{" "}
            <span className="text-[#FFC501]">
              {isClient ? answer1 : "..."}{" "}
            </span>
            kcal
          </p>
        </div>
        <Image src={veg} alt="veg" className="md:block hidden w-[250px]" />
      </div>
    </div>
  );
};

export default MealHead;
