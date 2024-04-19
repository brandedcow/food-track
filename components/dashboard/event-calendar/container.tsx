"use client";

import { CalendarEvent } from "@prisma/client";
import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "@/context/dashboard";
import { endOfDay, subDays } from "date-fns";

export const CALENDAR_TIME_LABEL_OFFSET = 60;

interface EventCalendarProps {}

export const EventCalendarContainer = ({}: EventCalendarProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { range } = useContext(DashboardContext);
  const [start, setStartDate] = useState<Date>(
    range?.from ?? subDays(new Date(), 7)
  );
  const [end, setEndDate] = useState<Date>(endOfDay(range?.to ?? new Date()));

  useEffect(() => {
    if (range && !!range.from && !!range.to) {
      setStartDate(range.from);
      setEndDate(endOfDay(range.to));
    }
  }, [range]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `/api/calendar-event?start=${start.getTime()}&end=${end.getTime()}`
        );
        const { data, success } = await result.json();

        if (success && data) {
          setEvents(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [start, end]);

  return (
    <div className="flex flex-col w-full">
      <CalendarHeader start={start} end={end} />
      <CalendarDaysOverview start={start} end={end} events={events} />
    </div>
  );
};
