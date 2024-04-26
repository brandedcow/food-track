"use client";

import { getDayName } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { eachDayOfInterval, getDate, getDay, isSameDay } from "date-fns";
import { v4 } from "uuid";

import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

interface CalendarHeaderProps {
  start: Date;
  end: Date;
}

export const CalendarHeader = ({ start, end }: CalendarHeaderProps) => {
  return (
    <div className="w-full flex py-1">
      <div className="basis-12">
        {/* TODO: Add Time Range Display Selector */}
      </div>
      {eachDayOfInterval({ start, end }).map((date, index) => {
        const isToday = isSameDay(new Date(), date);
        return (
          <div
            key={v4()}
            className={cn(
              "flex flex-1 justify-center flex-wrap py-[2px]",
              isToday && "bg-blue-500 rounded text-white"
            )}
          >
            <p
              className={cn(
                "w-full text-center uppercase text-[.6rem] font-medium leading-3 text-gray-400",
                isToday && "text-white"
              )}
            >
              {getDayName(getDay(date), { asAbbreviation: true })}
            </p>
            <h2 className={cn("font-semibold leading-4", openSans.className)}>
              {getDate(date)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};
