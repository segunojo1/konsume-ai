import React from "react";
import SidebarItem from "./SidebarItem";
import home from "../public/home.svg";
import logo from "../public/konsume_logo.svg";
import progress from "../public/assets/progress.svg";
import scanner from "../public/assets/scanner.svg";
import chat from "../public/chat.svg";
import profile from "../public/profile.svg";
import settings from "../public/settings.svg";
import logout from "../public/logout.svg";
import Calendar from "../public/calendar.svg";
import blogs from "../public/blog.svg"
import Image from "next/image";
import { DashboardNavProps } from "../@types";

const Sidebar: React.FC<DashboardNavProps> = ({ toggled }) => {
  return (
    <div
      className={`h-full p-4 bg-[#DAFDC9] md:fixed left-0 min-w-[82px] top-0  ${
        toggled ? "left-0" : "md:left-0 left-[-300px]"
      } absolute z-50 transition-all`}
    >
      <div className="h-full relative mx-auto w-fit flex flex-col gap-1 items-start">
        <Image
          src={logo}
          alt="logo"
          width={42}
          height={52}
          className="mx-auto"
        />
        <SidebarItem href="dashboard" text="Dashboard" icon={home} />
        <SidebarItem href="profile" text="Dashboard" icon={profile} />
        <SidebarItem href="scanner" text="Scanner" icon={scanner} />
        <SidebarItem href="timetable" text="Timetable" icon={Calendar} />
        <SidebarItem href="chat" text="Chat with Foodie AI" icon={chat} />
        <SidebarItem href="blogs" text="Blogs" icon={blogs} />
        <SidebarItem
          href="coming-soon"
          text="Coming Features"
          icon={progress}
        />
        <SidebarItem href="settings" text="Settings" icon={settings} />
        <div className="absolute bottom-0">
          <SidebarItem href="auth/login" text="Logout" icon={logout} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
