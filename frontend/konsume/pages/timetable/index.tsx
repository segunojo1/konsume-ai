"use client";

import MainLayout from "@/components/Layout/MainLayout";
import { RightPanel } from "./components/right-panel";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { MainPanel } from "./components/main-panel";

export default function SidebarDemo() {
  return (
    <MainLayout
      fixedTopbar={true}
      topBarText="Timetable"
      topBarIcon="dashborad"
      className="bg-success-200"
    >
      <RightPanel />
      {/* <MainPanel /> */}
    </MainLayout>
  );
}
