"use client";

import React, { useContext } from "react";
import { Calendar } from "../ui/calendar";
import { AddFoodButton } from "./add-food-button";
import {
  DashboardContext,
  DashboardContextProvider,
} from "@/context/dashboard";

export function Sidebar() {
  return (
    <DashboardContextProvider>
      <DashboardSidebar />
    </DashboardContextProvider>
  );
}

const DashboardSidebar = () => {
  const { date, setDate } = useContext(DashboardContext);

  return (
    <div className="flex flex-col p-6 gap-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <AddFoodButton />
    </div>
  );
};
