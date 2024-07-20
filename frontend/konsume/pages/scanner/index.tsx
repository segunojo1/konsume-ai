import React, { useState } from "react";
import Sidebar from "@/modules/dashboard/Sidebar";
import ScannerHead from "@/modules/scanner/ScannerHead";
import ScannerBody from "@/modules/scanner/ScannerBody";
import DashboardNav from "@/modules/dashboard/DashboardNav";
import withAuth from "../../helpers/withAuth";

const Scanner = () => {
  const [toggled, setToggled] = useState(false);
  return (
    <div>
      <Sidebar toggled={toggled} setToggled={setToggled} />
      <div
        className={`${toggled ? "" : "md:ml-[280px]"} gap-5 flex flex-col px-5`}
      >
        <DashboardNav toggled={toggled} setToggled={setToggled} />
        <ScannerHead />
        {/* <DashboardBody /> */}
        <ScannerBody />
      </div>
    </div>
  );
};

export default withAuth(Scanner);
