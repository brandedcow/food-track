"use client";

import { CalendarEvent } from "@prisma/client";
import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/context/dashboard";
import { subDays } from "date-fns";

export const CALENDAR_TIME_LABEL_OFFSET = 60;

interface EventCalendarProps {
  events: CalendarEvent[];
}

export const EventCalendarContainer = ({ events }: EventCalendarProps) => {
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
    <div className="flex flex-col w-full">
      <CalendarHeader start={start} end={end} />>
      <CalendarDaysOverview start={start} end={end} />
    </div>
  );
};
