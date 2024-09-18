"use client";

import { Tabs } from "@/components/ui/tabs";
import type { DateRange } from "react-day-picker";
import {
  format,
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  parse,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatDateToDDMMYY } from "@/lib/date";
import type { DailyMealsDatatype } from "@/@types/timetable";
import {
  setDailyMeals,
  setMeals,
  setTimetableLoading,
} from "@/redux/features/timetable.slice";
import Image from "next/image";
import MealsInfoCard from "./meals-info-card";
import DayContent from "./day-content";
import Cookies from "js-cookie";
import { useGetMealPlansQuery } from "@/redux/api/timetable.api";
import Loading from "./loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  date: DateRange | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MainPanel({ date, open, setOpen }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);
  const { dailyMeals, loading } = useAppSelector((state) => state.timetable);
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userid");
  const { data, isLoading } = useGetMealPlansQuery(userId);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const weeks =
    date?.from && date?.to
      ? eachDayOfInterval({ start: date.from, end: date.to }).slice(0, 3)
      : [];

  const days =
    date?.from && date?.to
      ? eachDayOfInterval({ start: date.from, end: date.to })
      : [];

  const handleWeeksNext = () => {
    setWeekOffset((prev) => prev + 4);
  };

  const handleWeeksPrevious = () => {
    setWeekOffset((prev) => (prev - 4 >= 0 ? prev - 4 : 0));
  };

  const filterMealsByDay = useCallback(
    (dailyMeals: DailyMealsDatatype[] | null, date: string) => {
      const meals = dailyMeals
        ? dailyMeals?.find((day) => {
            // Format the API date to match your 'DD/MM/YY' format
            const formattedAPIDate = formatDateToDDMMYY(new Date(day.date));
            return formattedAPIDate === date;
          })?.meal?.$values || null
        : null;
      return dispatch(setMeals(meals));
    },
    [dispatch]
  );

  const handleDayClick = (date: string) => {
    filterMealsByDay(dailyMeals, date); // Filter meals as usual
    console.log("date change");
    setActiveDate(date); // Update the activeDate when a button is clicked
  };
  useEffect(() => {
    if (activeDate) {
      console.log("activeDate has changed:", activeDate);
      // Perform other actions if needed, based on the new activeDate value
    }
  }, [activeDate]); 
  useEffect(() => {
  // If the date is available, update the activeDate and filter the meals
  if (date?.from) {
    const formattedDate = formatDateToDDMMYY(date.from);
    setActiveDate(formattedDate); // Set activeDate based on the selected date
    filterMealsByDay(dailyMeals, formattedDate); // Call the filterMealsByDay function
  }
}, [date, dailyMeals, filterMealsByDay]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setTimetableLoading(true));
    } else if (data?.value?.$values) {
      console.log(data.value.$values); // Debug: Check if data is fetched correctly
      dispatch(setDailyMeals(data.value.$values));
    } else {
      console.error("Data is not in expected format:", data); // Debug error logging
    }
  }, [data, dispatch, isLoading]);

  const tabs = [
    {
      title: "Day",
      value: "day",
      content: (
        <div className="space-y-16 overflow-hidden">
          <div className=" flex gap-[18px] w-full justify-between flex-wrap ">
          {days.map((day) => {
        const date = formatDateToDDMMYY(day);
        console.log(date);
        
        return (
          <Button
            key={`day-${date}`}
            // Add conditional class based on whether this date is the active one
            className={`cursor-pointer rounded-lg px-[8px] py-[14px] gap-2 flex flex-col items-center w-[103px] h-auto ${
              activeDate == date
                ? "bg-[#0A0609] text-base-white" // Apply active styles
                : "bg-secondary-100 text-primarytext" // Default styles
            }`}
            onClick={() => handleDayClick(date)}
          >
            <p className="text-desktop-caption font-bold">{format(day, "EEEE")}</p>
            <p className="text-desktop-feature font-bold">{format(day, "dd")}</p>
          </Button>
        );
      })}
          </div>
          <DayContent />
        </div>
      ),
    },
    {
      title: "Week",
      value: "week",
      content: (
        <div className="relative w-full space">
          <div className="flex gap-2 absolute right-0 -top-12">
            <Button
              onClick={handleWeeksPrevious}
              className="p-2 rounded-[100%] bg-[#393939] duration-150 opacity-100 hover:opacity-50 hover:bg-[#393939]/80 w-max h-auto"
            >
              <ChevronLeft
                className="h-4 w-4"
                color="white"
                strokeWidth="4px"
              />
            </Button>
            <Button
              onClick={handleWeeksNext}
              className="p-2 rounded-[100%] bg-[#393939] duration-150 opacity-100 hover:opacity-50 hover:bg-[#393939]/80 w-max h-auto"
            >
              <ChevronRight
                className="h-4 w-4"
                color="white"
                strokeWidth="4px"
              />
            </Button>
          </div>
          <div
            style={{ gridAutoRows: "1fr" }}
            className="grid grid-cols-3 grid-auto-rows-1fr justify-between w-full"
          >
            {weeks.map((week, index) => {
              const date = formatDateToDDMMYY(week);

              const filteredMeals =
                dailyMeals?.find((day) => {
                  // Convert API date to YYYY-MM-DD format
                  const formattedAPIDate = new Date(day.date)
                    .toISOString()
                    .split("T")[0];

                  // Parse the DD/MM/YY date string into a Date object, then convert it to YYYY-MM-DD format
                  const parsedInputDate = parse(date, "dd/MM/yy", new Date());
                  const formattedInputDate = parsedInputDate
                    .toISOString()
                    .split("T")[0];

                  return formattedAPIDate === formattedInputDate;
                })?.meal.$values || [];

              console.log(date, "week", filteredMeals);

              return (
                <div
                  key={`week-${date}`}
                  className=" flex flex-col  flex-1 gap-10 items-center"
                >
                  <div className="cursor-pointer rounded-lg px-[7px] py-[14px] bg-base-black text-base-white gap-2 flex flex-col items-center w-[103px]">
                    <p className="text-desktop-caption font-bold">
                      {format(week, "EEEE")}
                    </p>
                    <p className="text-desktop-feature font-bold">
                      {format(week, "dd")}
                    </p>
                  </div>
                  <div className="border-[#D1C9F7] border-r px-5 w-full space-y-8 ">
                    {filteredMeals?.map((meal) => (
                      <MealsInfoCard
                        key={meal.label}
                        data={meal}
                        className="w-full"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-[3] px-7 container">
      <div className="flex flex-col items-center justify-center w-full relative">
      {loading ? (
  <Loading />
) : (
  <Tabs
    key={`${weekOffset}-${activeDate}-${date?.from?.toISOString()}-${date?.to?.toISOString()}`} // Include activeDate in the key
    tabs={tabs}
  />
)}


        {!open && (
          <Button
            onClick={() => setOpen(!open)}
            className="text-[14px]  font-bold flex items-center gap-4 absolute top-14 left-0"
          >
            <Image src="/calendar.svg" alt="" width={32} height={32} />
            Open Side Menu
          </Button>
        )}
      </div>
    </div>
  );
}
export default MainPanel;
