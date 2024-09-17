import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import profile from "../../public/avatar.svg";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import EditProfileModal from "@/modules/profile/EditProfileModal";

const Profile = () => {
    const {username, email, nationality, userGoals, allergies, DOB, weight, gender, dietType} = useUserContext();
    const [firstName, setFirstName] = useState(username?.split(" ")[0] ?? "");
    const [lastName, setLastName] = useState(username?.split(" ")[1] ?? "");
    const colorsList = ["#EDFAE7", "#E8E4FB", "#f4c7908c", "#b0d2c18f"];
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colorsList.length);
        return colorsList[randomIndex];
    }

useEffect(() => {
  
  setFirstName(username?.split(" ")[0] ?? "");
  setLastName(username?.split(" ")[1] ?? "");
}, [username]);
  return (
    <MainLayout
      topBarIcon="profile"
      topBarText="Profile"
      fixedTopbar={true}
      className="bg-[#FAFAFA] "
    >
      <div className="bg-[white] p-6 rounded-lg font-satoshi flex flex-col gap-5">
        <div>
          <h1 className="text-[24px]/[36px] font-bold">My Profile</h1>
          <p className="text-[14px]/[24px] text-[#667185] tracking-wide">
            Take a look at your policies and the new policy to see what is
            covered
          </p>
        </div>
        <div className="bg-[#FAFAFA] flex gap-3 p-8">
          <Image src={profile} width={80} height={80} alt="" />
          <div className="flex flex-col justify-between">
            <h1 className="font-bold text-[18px]/[24px]">{username ? username : "..." }</h1>
            <p className="text-[14px]/[24px] text-[#667185]">Weight: {weight} kg, Gender: {gender}</p>
            <p className="text-[14px]/[24px] text-[#667185]">{nationality}</p>
          </div>
        </div>
        <div className="border border-[#d9d9d94d] py-10 p-8 rounded-lg flex flex-col gap-12">
          <div className="flex justify-between">
            <div>
              <h1 className="text-[18px]/[24px] font-bold">
                Personal Information
              </h1>
              <p className="text-[14px]/[24px] text-[#667185] tracking-wide">
                Here you get information on yourself
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 max-w-[600px] gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">First Name</p>
                <p className="font-medium text-[16px]/[24px]">{firstName ? firstName : "..."}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Last Name</p>
                <p className="font-medium text-[16px]/[24px]">{lastName ? lastName : "..."}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Email</p>
                <p className="font-medium text-[16px]/[24px]">{email}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Date of Birth</p>
                <p className="font-medium text-[16px]/[24px]">{DOB}</p>
            </div>
            
          </div>
        </div>
        <div className="border border-[#d9d9d94d] py-10 p-8 rounded-lg flex flex-col gap-12">
          <div className="flex md:flex-row flex-col gap-1 justify-between">
            <div className="">
              <h1 className="text-[18px]/[24px] font-bold">
              Other Information
              </h1>
              <p className="text-[14px]/[24px] text-[#667185] tracking-wide">
                Here you get other information on yourself
              </p>
            </div>
            <EditProfileModal />
          </div>
          <div className="grid md:grid-cols-2 max-w-[600px] gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Wellness Goal</p>
                <p className="font-medium text-[16px]/[24px]">{userGoals.map((goal:any) => <div key={goal} style={{backgroundColor: getRandomColor()}} className={`text-[#344054] p-2 rounded-[6px] border border-[#D0D5DD] w-fit px-3 `}>{goal}</div>)}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Health Conditions</p>
                <p className="font-medium text-[16px]/[24px]">{allergies.map((goal:any) => <div key={goal} style={{backgroundColor: getRandomColor()}} className={`text-[#344054] p-2 rounded-[6px] border border-[#D0D5DD] w-fit px-3 `}>{goal}</div>)}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Diet</p>
                <p className="font-medium text-[16px]/[24px] text-[#344054] p-2 rounded-[6px] border border-[#D0D5DD] w-fit px-3 " style={{backgroundColor: getRandomColor()}}>{dietType}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Nationality</p>
                <p className="font-medium text-[16px]/[24px]">{nationality}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
