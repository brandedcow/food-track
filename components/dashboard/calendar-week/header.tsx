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

const openSans = Open_Sans({ subsets: ["latin"] });

export const CalendarHeader = () => {
  const { range } = useContext(DashboardContext);
  const [start, setStartDate] = useState<Date>(
    range?.from ?? subDays(new Date(), 7)
  );
  const [end, setEndDate] = useState<Date>(range?.to ?? new Date());

  useEffect(() => {
    if (range && !!range.from && !!range.to) {
      console.log("change dates");
      setStartDate(range.from);
      setEndDate(range.to);
    }
  }, [range]);

  return (
    <div className="flex flex-grow-0 w-full flex-row justify-around">
      {eachDayOfInterval({ start, end }).map((date, index) => {
        const isToday = isSameDay(new Date(), date);
        return (
          <div
            key={`calendar-week-header-day-${index}`}
            className="flex flex-col items-center"
          >
            <p
              className={cn(
                "uppercase text-sm font-medium",
                isToday && "text-blue-600"
              )}
            >
              {getDayName(getDay(date), { asAbbreviation: true })}
            </p>
            <h2
              className={cn(
                "text-4xl p-3 rounded-full font-normal",
                openSans.className,
                isToday && "bg-blue-600 text-white"
              )}
            >
              {getDate(date)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};
