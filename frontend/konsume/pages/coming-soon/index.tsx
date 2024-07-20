import DashboardNav from "@/modules/dashboard/DashboardNav";
import Sidebar from "@/modules/dashboard/Sidebar";
import React, { useState } from "react";
import { useSetupContext } from "../../context/SetupContext";
import withAuth from "../../helpers/withAuth";
import ComingHead from "@/modules/coming-soon/ComingHead";
import ComingBody from "@/modules/coming-soon/ComingBody";

const ComingSoon = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const { userGoal } = useSetupContext();
  console.log(userGoal);

  return (
    <div>
      <Sidebar toggled={toggled} setToggled={setToggled} />
      <div
        className={`${toggled ? "" : "md:ml-[280px]"} gap-5 flex flex-col px-5`}
      >
        <DashboardNav toggled={toggled} setToggled={setToggled} />
        <ComingHead />
        <ComingBody />
      </div>
    </div>
  );
};

export default withAuth(ComingSoon);
