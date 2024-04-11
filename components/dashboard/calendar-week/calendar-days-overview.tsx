"use client";

import { DashboardContext } from "@/context/dashboard";
import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  getHours,
  startOfDay,
  subDays,
} from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CalendarDay } from "./calendar-day";

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
    <div className="flex flex-1">
      <div className="overflow-y-scroll">
        <TimeLabel />
        {eachDayOfInterval({ start, end }).map((date, index) => {
          return <CalendarDay key={`calendar-week-days-${index}`} day={date} />;
        })}
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
    <div>
      Columns
      {hours.map((hour, index) => (
        <div key={`time-label-${index}`} className="h-10">
          <p>{getHours(hour)}</p>
        </div>
      ))}
    </div>
  );
};
