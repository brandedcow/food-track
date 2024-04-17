"use client";

import { DashboardContext } from "@/context/dashboard";
import { getDayName } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import {
  eachDayOfInterval,
  getDate,
  getDay,
  isSameDay,
  subDays,
} from "date-fns";
import { useContext, useEffect, useState } from "react";

import { Open_Sans } from "next/font/google";
import { CALENDAR_TIME_LABEL_OFFSET } from "./container";

const openSans = Open_Sans({ subsets: ["latin"] });

export const CalendarHeader = () => {
  const { range } = useContext(DashboardContext);
  const [start, setStartDate] = useState<Date>(
    range?.from ?? subDays(new Date(), 7)
  );
  const [end, setEndDate] = useState<Date>(range?.to ?? new Date());

  useEffect(() => {
    if (range && !!range.from && !!range.to) {
      setStartDate(range.from);
      setEndDate(range.to);
    }
  }, [range]);

  return (
    <div
      className="flex flex-grow-0 justify-around pt-6 pb-2"
      style={{ marginLeft: CALENDAR_TIME_LABEL_OFFSET }}
    >
      {eachDayOfInterval({ start, end }).map((date, index) => {
        const isToday = isSameDay(new Date(), date);
        return (
          <div
            key={`calendar-week-header-day-${index}`}
            className={cn(
              "flex flex-row gap-x-2 items-center justify-around px-2 rounded-sm",
              isToday && "bg-blue-500 text-white"
            )}
          >
            <p
              className={cn(
                "uppercase font-medium text-gray-500",
                isToday && "text-white"
              )}
            >
              {getDayName(getDay(date), { asAbbreviation: true })}
            </p>
            <h2 className={cn("font-semibold", openSans.className)}>
              {getDate(date)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};
