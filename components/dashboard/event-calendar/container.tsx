"use client";

import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";
import { useEffect, useState } from "react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import useSelectedDateRange from "@/store/useSelectedDateRange";

export const CALENDAR_TIME_LABEL_OFFSET = 60;

interface EventCalendarProps {
  refresh?: boolean;
}

const fetchData = async (start: Date, end: Date) => {
  console.log("fetch data");
  try {
    const response = await fetch(
      `/api/calendar-event?start=${start.getTime()}&end=${end.getTime()}`,
      {
        next: { tags: ["calendar-event"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const EventCalendarContainer = ({ refresh }: EventCalendarProps) => {
  const { selectedDateRange } = useSelectedDateRange();
  const [start, setStart] = useState(
    selectedDateRange.from ?? subDays(startOfDay(new Date()), 7)
  );
  const [end, setEnd] = useState(selectedDateRange.to ?? endOfDay(new Date()));

  useEffect(() => {
    if (!!selectedDateRange.from && !!selectedDateRange.to) {
      setStart(selectedDateRange.from);
      setEnd(selectedDateRange.to);
    }
  }, [selectedDateRange]);

  return (
    <div className="flex flex-col w-full">
      <CalendarHeader start={start} end={end} />
      <CalendarDaysOverview start={start} end={end} events={[]} />
    </div>
  );
};
