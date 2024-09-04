"use client";

import MainLayout from "@/components/Layout/MainLayout";
import { RightPanel } from "./components/right-panel";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { MainPanel } from "./components/main-panel";

export default function SidebarDemo() {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <MainLayout
      fixedTopbar={true}
      topBarText="Timetable"
      topBarIcon="dashborad"
    >
      <main className="flex">
        <RightPanel
          date={date}
          setDate={setDate}
          open={open}
          setOpen={setOpen}
        />
        <MainPanel date={date} open={open} setOpen={setOpen} />
      </main>
    </MainLayout>
  );
}
