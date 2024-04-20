"use client";

import React from "react";
import { Calendar } from "../ui/calendar";
import { AddFoodButton } from "./add-food-button";
import { AddStoolButton } from "./add-stool-button";
import { AddNoteButton } from "./add-note-button";
import useSelectedDateRange from "@/store/useSelectedDateRange";

export const DashboardSidebar = () => {
  const { selectedDateRange, setSelectedDateRange } = useSelectedDateRange();

  return (
    <div className="flex flex-grow-0 h-full flex-col p-6 gap-y-4">
      <Calendar
        mode="range"
        defaultMonth={new Date()}
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        className="rounded-md border"
        min={2}
        max={7}
      />
      <AddFoodButton />
      <AddStoolButton />
      <AddNoteButton />
    </div>
  );
};
