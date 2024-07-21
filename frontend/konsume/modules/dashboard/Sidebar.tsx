import React from "react";
import SidebarItem from "./SidebarItem";
import dashboard from "../../public/assets/dashboard.svg";
import profile from "../../public/assets/profile.svg";
import progress from "../../public/assets/progress.svg";
import scanner from "../../public/assets/scanner.svg";
import chat from "../../public/assets/chat.svg";
import pill from "../../public/assets/pills-bottle.png";
import konsum from "../../public/assets/konsume.png";
import Image from "next/image";
import { DashboardNavProps } from "../../@types";
import { PillBottle } from "lucide-react";

const Sidebar: React.FC<DashboardNavProps> = ({ toggled }) => {
  return (
    <div
      className={`h-full p-8 bg-[#DAFDC9] md:fixed left-0 min-w-[250px] top-0  ${
        toggled ? "left-0" : "md:left-0 left-[-300px]"
      } absolute z-50 transition-all`}
    >
      <div className="h-full flex flex-col gap-4 items-start">
        <h1 className=" font-bold text-3xl mb-4">Konsume</h1>
        <SidebarItem href="dashboard" text="Dashboard" icon={dashboard} />
        <SidebarItem href="scanner" text="Scanner" icon={scanner} />
        <SidebarItem href="chat" text="Chat with Foodie AI" icon={chat} />
        <SidebarItem
          href="coming-soon"
          text="Coming Features"
          icon={progress}
        />
        <SidebarItem href="auth/login" text="Logout" icon={profile} />
      </div>
    </div>
  );
};

export default Sidebar;
