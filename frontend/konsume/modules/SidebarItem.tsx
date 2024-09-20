import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { SidebarProps } from "../@types";
import Cookies from "js-cookie";
import MealsContext from "@/context/MealsContext";
import { useRouter } from "next/router";
import MainLayoutContext from "@/context/LayoutContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SidebarItem: React.FC<SidebarProps> = ({ icon, text, href }) => {
  const { toggled, setToggled } = useContext(MainLayoutContext);

  const router = useRouter();
  const handleClick = () => {
    setToggled(false);
    if (href == "auth/login") {
      Cookies.remove("ktn");
      Cookies.remove("userid");
      localStorage.clear();
      Cookies.remove("visited");
    }
  };
  const isActive = router.pathname === `/${href}`;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/${href}`}>
            <div
              className={`flex gap-5 ${
                isActive ? "bg-[#0c250353] sideitem" : ""
              } relative font-medium text-xl leading-[53px] rounded-lg cursor-pointer items-center p-2 ${href}`}
              onClick={handleClick}
            >
              <Image
                src={icon}
                alt={text}
                className={isActive ? "brightness-150" : ""}
                width={18}
                height={18}
              />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
