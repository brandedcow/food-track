"use client";

import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";
import { useEffect, useState } from "react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import useSelectedDateRange from "@/store/useSelectedDateRange";
import useCalendarEvents from "@/store/useCalendarEvents";
import { useCalendarEventsAPI } from "@/fetch-hooks/useCalendarEventsAPI";
import { cn } from "@/lib/utils";

interface EventCalendarProps {}

export const EventCalendarContainer = ({}: EventCalendarProps) => {
  const { selectedDateRange } = useSelectedDateRange();
  const [start, setStart] = useState(
    selectedDateRange.from ?? subDays(startOfDay(new Date()), 7)
  );
  const [end, setEnd] = useState(selectedDateRange.to ?? endOfDay(new Date()));
  const { calendarEvents } = useCalendarEvents();
  const { fetchCalendarEvents } = useCalendarEventsAPI();

  useEffect(() => {
    if (!!selectedDateRange.from && !!selectedDateRange.to) {
      setStart(selectedDateRange.from);
      setEnd(selectedDateRange.to);
      fetchCalendarEvents();
    }
  }, [selectedDateRange, start, end, fetchCalendarEvents]);

  return (
    <div
      className={cn(
        "w-full h-full pl-2 pr-[1px] flex flex-col overflow-hidden",
        "laptop:pl-0"
      )}
    >
      <CalendarHeader start={start} end={end} />
      <CalendarDaysOverview start={start} end={end} events={calendarEvents} />
    </div>
  );
};
