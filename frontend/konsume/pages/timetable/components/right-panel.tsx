import type React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import nutritionalInfo, { colors } from "../../../helpers/timetable/data";
import Card from "./card";
import NutritionalInfoBox from "./nutritional-info-box";
import getRandomColor from "../utils";


type Props = {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const RightPanel = ({ date, setDate, open, setOpen }: Props) => {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const user = Cookies.get("konsumeUsername");
    if (user) {
      const [firstName] = user.split(" ");
      setFirstName(firstName);
    }
  }, []);

  return (
    <motion.aside
      className=" space-y-11 w-[273px] overflow-hidden hidden sm:block f"
      animate={{
        width: open ? "273px" : "0px",
        // display: open ? "block" : "none",
      }}
    >
      <section className="relative">
        <h1 className=" text-desktop-heading4 font-bold">
          Hello, {firstName}!
        </h1>
        <Button className="absolute right-0" onClick={() => setOpen(!open)}>
          <Image src="/dock-left.svg" alt="" width={37} height={37} />
        </Button>
      </section>
      <div className=" space-y-4 font-satoshi">
        <Card.Container>
          <Calendar mode="range" selected={date} onSelect={setDate} />
        </Card.Container>
        <Card.Container>
          <div className="space-y-6">
            <div className="flex justify-between gap-4 ">
              <h2 className="text-desktop-caption font-bold max-w-[125px]">
                Today&apos;s Spotlighted Meal
              </h2>
              <Image src="/spotlight-icon.svg" alt="" width={37} height={37} />
            </div>
            <div className="pb-11">
              <h3 className="text-[15px] font-bold ">
                Jollof Rice, Plantain and Chicken
              </h3>
              <p className="text-[11px]">
                A popular Nigerian dish containing some ingredients sha like
                shdfhffb dhfbf ffjff jfd gjfg gjggg ggggjgg...
              </p>
            </div>
            <Button className="bg-base-white text-secondary absolute right-0 bottom-0">
              View Recipe and Details
            </Button>
          </div>
        </Card.Container>
        <Card.Container>
          <div className="space-y-6">
            <h2 className="text-desktop-caption font-bold max-w-[125px]">
              Nutritional Info
            </h2>
            <div className="space-y-1 max-w-[196px] mx-auto">
              {nutritionalInfo?.$values?.map(({ name, value, unit }, index) => {
                const bg = getRandomColor();
                return (
                  <NutritionalInfoBox
                    key={`${name}-${value}-${unit}`}
                    bg={bg}
                    name={name}
                    value={value}
                    unit={unit}
                  />
                );
              })}
            </div>
          </div>
        </Card.Container>
      </div>
    </motion.aside>
  );
};
export default RightPanel;
