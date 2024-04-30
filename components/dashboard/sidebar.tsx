"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AddEventButton } from "./add-event-button";
import { DateRangePicker } from "../shared/date-range-picker";
import { PiBowlFood, PiNoteDuotone, PiToiletPaper } from "react-icons/pi";
import useMediaQuery from "@/fetch-hooks/useMediaQuery";

export const DashboardSidebar = () => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 gap-x-2",
        "laptop:flex-col laptop:justify-start laptop:gap-y-4"
      )}
    >
      {isLaptop && <DateRangePicker mode="calendar" />}
      <AddEventButton
        label="Add Food"
        icon={<PiBowlFood />}
        href={{ pathname: "dashboard", query: { modal: "add-food" } }}
        size="responsive-sm-lg"
      />
      <AddEventButton
        label="Add Stool"
        icon={<PiToiletPaper />}
        href={{ pathname: "dashboard", query: { modal: "add-stool" } }}
        size="responsive-sm-lg"
        variant="secondary"
      />
      <AddEventButton
        label="Add Note"
        icon={<PiNoteDuotone />}
        href={{ pathname: "dashboard", query: { modal: "add-note" } }}
        size="responsive-sm-lg"
        variant="outline"
      />
    </div>
  );
};
