import React from "react";
import DashboardQuickIcon from "../DashboardQuickIcon";

const DashboardQuickActions: React.FC = () => {
  return (
    <div className="flex justify-between">
      <DashboardQuickIcon text="Chat with FoodieAI" img="/icon4.svg" link="chat" />
      <DashboardQuickIcon text="Open AI scanner" img="/icon4.svg" link="scanner" />
      <DashboardQuickIcon text="Recommended meals" img="/icon4.svg" link="meals" />
      <DashboardQuickIcon text="Restaurants" img="/icon4.svg" link="restaurants" />
    </div>
  );
};

export default DashboardQuickActions;
