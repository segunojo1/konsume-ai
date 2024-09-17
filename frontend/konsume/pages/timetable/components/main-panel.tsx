"use client";

import { Tabs } from "@/components/ui/tabs";
import type { DateRange } from "react-day-picker";
import {
  format,
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
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
import { Loading } from "./loading";
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
        ? dailyMeals?.find((day) => day.date === date)?.meal?.$values || null
        : null;
      return dispatch(setMeals(meals));
    },
    [dispatch]
  );

  useEffect(() => {
    if (date?.from) {
      const dateData = formatDateToDDMMYY(date?.from);
      filterMealsByDay(dailyMeals, dateData);
    }
  }, [date, dailyMeals, filterMealsByDay]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setTimetableLoading(true));
    } else if (data) {
      dispatch(setDailyMeals(data.value.$values));
    }
  }, [data, dispatch, isLoading]);

  const tabs = [
    {
      title: "Day",
      value: "day",
      content: (
        <div className="space-y-16 overflow-hidden">
          <div className=" flex gap-[18px] w-full justify-between flex-wrap ">
            {days.map((day, index) => {
              const date = formatDateToDDMMYY(day);
              return (
                <Button
                  key={`day-${date}`}
                  className="rounded-lg px-[8px] py-[14px] bg-base-black text-base-white gap-2 flex flex-col items-center w-[103px] h-auto"
                  onClick={() => filterMealsByDay(dailyMeals, date)}
                >
                  <p className="text-desktop-caption font-bold">
                    {format(day, "EEEE")}
                  </p>
                  <p className="text-desktop-feature font-bold">
                    {format(day, "dd")}
                  </p>
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
                dailyMeals?.find((day) => day.date === date)?.meal.$values ||
                [];
              console.log(date, "week", filteredMeals);
              return (
                <div
                  key={`week-${date}`}
                  className="flex flex-col  flex-1 gap-10 items-center"
                >
                  <div className="rounded-lg px-[7px] py-[14px] bg-base-black text-base-white gap-2 flex flex-col items-center w-[103px]">
                    <p className="text-desktop-caption font-bold">
                      {format(week, "EEEE")}
                    </p>
                    <p className="text-desktop-feature font-bold">
                      {format(week, "dd")}
                    </p>
                  </div>
                  <div className="border-[#D1C9F7] border-r px-5 w-full space-y-8 ">
                    {filteredMeals?.map((meal, index) => (
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
            key={
              weekOffset ||
              (date?.from?.toISOString() && date?.to?.toISOString())
            }
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
