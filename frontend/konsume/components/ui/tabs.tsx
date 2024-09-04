"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  // useEffect(() => {
  //   setTabs(propTabs);
  //   setActive(propTabs[0]);
  // }, [propTabs]);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <div className="space-y-10 flex flex-col items-center w-full">
      <div
        className={cn(
          "flex flex-row items-center justify-start w-max [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar bg-secondary-100 rounded-xl py-[5px] px-[18px]",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            className={cn("relative px-6 py-[10px]", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-base-white rounded-xl  ",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block font-medium">{tab.title}</span>
          </button>
        ))}
      </div>
      {active.content}
    </div>
  );
};
