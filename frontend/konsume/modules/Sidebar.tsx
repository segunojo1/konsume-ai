import React, { useEffect } from "react";
import SidebarItem from "./SidebarItem";
import home from "../public/home.svg";
import logo from "../public/konsume_logo.svg";
import progress from "../public/assets/progress.svg";
import scanner from "../public/scan.svg";
import chat from "../public/chat.svg";
import profile from "../public/profile.svg";
import settings from "../public/settings.svg";
import logout from "../public/logout.svg";
import Calendar from "../public/calendar.svg";
import blogs from "../public/book-02.svg"
import meals from "../public/recommendedmeals.svg"
import Image from "next/image";
import { DashboardNavProps } from "../@types";
import { Steps, Hints } from 'intro.js-react';

const Sidebar: React.FC<DashboardNavProps> = ({ toggled }) => {
  
  
  const hints = [
    {
      element: '.selector1',
      hint: 'test 1',
      hintPosition: 'middle-middle',
    },
    {
      element: '.selector2',
      hint: 'test 2',
    },
  ];
 
  return (
    <div
      className={`min-h-screen p-4 bg-primary-bg md:fixed left-0 min-w-[82px] top-0 side1  ${
        toggled ? "left-0" : "md:left-0 left-[-300px]"
      } fixed  z-[6000] transition-all`}
    >
      
{/* <Hints
  enabled={true}
  hints={hints}
  ref={hints => (this.hints = hints)}
/> */}
      <div className="min-h-[90vh] relative mx-auto w-fit flex flex-col gap-1 items-center sidee"  data-intro='Hello step one!'>
        <Image
          src={logo}
          alt="logo"
          width={42}
          height={52}
          className="mx-auto mb-5"
        />
        <SidebarItem href="dashboard" text="Dashboard" icon={home} />
        <SidebarItem href="timetable" text="Timetable" icon={Calendar} />
        <SidebarItem href="chat" text="Chat with Foodie AI" icon={chat} />
        <SidebarItem href="scanner" text="Scanner" icon={scanner} />
        <SidebarItem href="meals" text="Meals" icon={meals} />
        <SidebarItem href="blogs" text="Blogs" icon={blogs} />        
        <SidebarItem href="profile" text="Profile" icon={profile} />
        <div className="absolute bottom-0">
          <SidebarItem href="auth/login" text="Logout" icon={logout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
