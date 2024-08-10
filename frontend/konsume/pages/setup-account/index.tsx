import Steps from "@/modules/setup-account/Steps";
import Welcome from "@/modules/setup-account/Welcome";
import React, { useContext, useEffect, useState } from "react";
import Form from "@/modules/setup-account/Form";
import { useSetupContext } from "../../context/SetupContext";
import { useRouter } from "next/router";
import { axiosKonsumeInstance } from "../../http/konsume";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Image from "next/image";

const SetupAccount = () => {
  const {
    nextPage,
    currentPage,
    userGoal,
    possibleDiseases,
    setPossibleDiseases,
    setUserGoal,
    age,
    height,
    gender,
    weight,
    diet,
    userID,
  } = useSetupContext();
  const [test, setTest] = useState(false);

  useEffect(() => {
    setPossibleDiseases([]);
    setUserGoal("");
    Cookies.remove("possibleDiseases");
    Cookies.remove("userGoal");
  }, []);
  const route = useRouter();
  const submitForm = async () => {
    try {
      toast.info("Loading...");
      const { data } = await axiosKonsumeInstance.post(
        "/api/profile/create",
        {
          dateOfBirth: age,
          gender: gender,
          height: "2",
          weight: weight,
          nationality: height,
          bodyFat: "",
          dietType: diet,
          snackPreference: "",
          noOfMealPerDay: "",
          allergies: possibleDiseases,
          userGoals: [userGoal],
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("ktn")}`,
          },
          params: {
            userId: Cookies.get("userid"),
          },
        }
      );
      console.log(data);
      Cookies.set("age", age);
      Cookies.set("gender", gender);
      Cookies.set("height", height);
      Cookies.set("diet", diet);
      Cookies.set("possibleDiseases", possibleDiseases);
      Cookies.set("goal", userGoal);
      route.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div className=" m-auto 2xl:p-32 md:py-14 md:pb-20 md:px-24 p-1 bg-base-white relative ">
      <Image src="/bg.png" alt="bg" width={1407} height={377} className=" top-0 absolute   w-full left-0" />
      <div className=" p-8 pb-28 font-satoshi bg-[#ffffffb0] relative z-10 backdrop-blur-lg ">
        <div className="flex gap-[10px] items-center">
          <Image src="/arrowleft.svg" alt="back" width={17.5} height={100} className="m-[3px]" />
          <p className="text-[14px]/[20px] font-bold">Back</p>
        </div>
        {/* <Steps /> */}
        <div>
          <div>
            <div className="relative w-fit mx-auto">
              <Image src='/curved_line.svg' alt='curved line' height={500} width={282} className='2xl:w-[282px] md:w-[250px] w-[141.16px] absolute 2xl:top-5 top-5 2xl:-right-[14px] -right-[30px] -z-10' />
              <h1 className="text-[48.9px]/[79.5px] font-bold from-[#000000] from-0% to-100% to-[#EEECEC] bg-gradient-to-b bg-clip-text text-[transparent] z-50">Welcome onboard Seyi! </h1>
            </div>
          </div>
          <p className=" text-[17.7px] text-center">Let’s begin your personalised wellness Journey! To get started, please tell us a bit about yourself. Sign up for yourself <br />  and get personalized meal recommendations, progress tracking, and more.</p>
        </div>
        <div className='2xl:w-[473.93px] md:w-[271px] 2xl:h-[241.42px] md:h-[160px] rounded-[61469.42px] mx-auto bg-neutrals-100 fixed top-[180px] left-0 right-0 -z-10 blur-[170.6px]'></div>
        <Form />
        {currentPage == 4 && (
          <button
            className=" mt-12 m-auto py-[7px] px-[84px] bg-[#8DCF38] rounded-[34.71px]  w-fit flex"
            onClick={submitForm}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default SetupAccount;
