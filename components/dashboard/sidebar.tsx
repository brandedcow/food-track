"use client";

import React, { useContext } from "react";
import { Calendar } from "../ui/calendar";
import { AddFoodButton } from "./add-food-button";
import { DashboardContext } from "@/context/dashboard";
import { SelectRangeEventHandler } from "react-day-picker";

export const DashboardSidebar = () => {
  const { range, setRange } = useContext(DashboardContext);

  return (
    <div className="flex flex-col p-6 gap-y-6">
      <Calendar
        mode="range"
        defaultMonth={new Date()}
        selected={range}
        onSelect={setRange as SelectRangeEventHandler}
        className="rounded-md border"
        min={3}
        max={7}
      />
      <AddFoodButton />
    </div>
  );
};