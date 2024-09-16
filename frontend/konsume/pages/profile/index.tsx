import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import React from "react";
import profile from "../../public/avatar.svg";
import { Button } from "@/components/ui/button";

const Profile = () => {
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
            <h1 className="font-bold text-[18px]/[24px]">Segun Ojo</h1>
            <p className="text-[14px]/[24px] text-[#667185]">Weight: 223kg</p>
            <p className="text-[14px]/[24px] text-[#667185]">Nigerian</p>
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
            <Button className="bg-[#fafbfc] border-[#D1D8E2] border w-[155px] text-[16px]/[24px]">
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-2 max-w-[600px] gap-5">
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">First Name</p>
                <p className="font-medium text-[16px]/[24px]">Segun</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Last Name</p>
                <p className="font-medium text-[16px]/[24px]">Ojo</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Email</p>
                <p className="font-medium text-[16px]/[24px]">olusegunkd2017@gmail.com</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Nationality</p>
                <p className="font-medium text-[16px]/[24px]">Nigerian</p>
            </div>
          </div>
        </div>
        <div className="border border-[#d9d9d94d] py-10 p-8 rounded-lg flex flex-col gap-12">
          <div className="flex justify-between">
            <div>
              <h1 className="text-[18px]/[24px] font-bold">
              Other Information
              </h1>
              <p className="text-[14px]/[24px] text-[#667185] tracking-wide">
                Here you get other information on yourself
              </p>
            </div>
            <Button className="bg-[#fafbfc] border-[#D1D8E2] border w-[155px] text-[16px]/[24px]">
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-2 max-w-[600px] gap-5">
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Wellness Goal</p>
                <p className="font-medium text-[16px]/[24px]">Segun</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Health Conditions</p>
                <p className="font-medium text-[16px]/[24px]">Ojo</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Diet</p>
                <p className="font-medium text-[16px]/[24px]">olusegunkd2017@gmail.com</p>
            </div>
            <div className="fle flex-col gap-2">
                <p className="text-[15px]/[24px] text-[#667185] ">Nationality</p>
                <p className="font-medium text-[16px]/[24px]">Nigerian</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
