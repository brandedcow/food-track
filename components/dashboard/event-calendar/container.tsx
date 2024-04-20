"use client";

import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";
import { useEffect, useState } from "react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import useSelectedDateRange from "@/store/useSelectedDateRange";
import { fetchEventCalendarData } from "@/lib/fetch-calls";
import useCalendarEvents from "@/store/useCalendarEvents";

export const CALENDAR_TIME_LABEL_OFFSET = 60;

interface EventCalendarProps {}

export const EventCalendarContainer = ({}: EventCalendarProps) => {
  const { selectedDateRange } = useSelectedDateRange();
  const [start, setStart] = useState(
    selectedDateRange.from ?? subDays(startOfDay(new Date()), 7)
  );
  const [end, setEnd] = useState(selectedDateRange.to ?? endOfDay(new Date()));
  const { calendarEvents, setCalendarEvents } = useCalendarEvents();

  useEffect(() => {
    const getData = async () => {
      const { success, data } = await fetchEventCalendarData(start, end);
      if (success && data) {
        console.log("set events");
        setCalendarEvents(data);
      }
    };

    if (!!selectedDateRange.from && !!selectedDateRange.to) {
      setStart(selectedDateRange.from);
      setEnd(selectedDateRange.to);
      getData();
    }
  }, [selectedDateRange, start, end, setCalendarEvents]);

  return (
    <div className="flex flex-col w-full">
      <CalendarHeader start={start} end={end} />
      <CalendarDaysOverview start={start} end={end} events={calendarEvents} />
    </div>
  );
};
