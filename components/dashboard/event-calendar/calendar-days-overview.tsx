"use client";

import { DashboardContext } from "@/context/dashboard";
import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  getHours,
  startOfDay,
  subDays,
} from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CalendarDay } from "./calendar-day";
import { CALENDAR_TIME_LABEL_OFFSET } from "./container";

export const CalendarDaysOverview = () => {
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
    <div className="flex flex-col overflow-y-scroll">
      <div className="flex ">
        <TimeLabel />
        <div className="flex w-full">
          {eachDayOfInterval({ start, end }).map((date, index) => {
            return (
              <CalendarDay key={`calendar-week-days-${index}`} day={date} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TimeLabel = () => {
  const hours = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  return (
    <div
      className="flex flex-col"
      style={{ width: CALENDAR_TIME_LABEL_OFFSET }}
    >
      {hours.map((hour, index) => (
        <div
          key={`time-label-${index}`}
          className="h-10 pr-2 flex items-end justify-end"
        >
          <p className="text-sm text-gray-400">{format(hour, "h aa")}</p>
        </div>
      ))}
    </div>
  );
};
