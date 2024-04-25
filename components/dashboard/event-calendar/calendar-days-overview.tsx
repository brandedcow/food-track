"use client";

import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";
import { CalendarDay } from "./calendar-day";
import { CalendarEvent } from "@prisma/client";
import { v4 } from "uuid";

interface CalendarDaysOverviewProps {
  start: Date;
  end: Date;
  events: CalendarEvent[];
}

export const CalendarDaysOverview = ({
  start,
  end,
  events,
}: CalendarDaysOverviewProps) => {
  return (
    <div className="w-full h-full overflow-scroll">
      <div className="flex">
        <TimeLabel />
        <div className="flex flex-1">
          {eachDayOfInterval({ start, end }).map((date, index) => {
            return (
              <CalendarDay
                key={`calendar-week-days-${index}`}
                day={date}
                events={events}
              />
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
    <div className="basis-12">
      {hours.map((hour, index) => (
        <div key={v4()} className="h-10 pr-1 border-gray-200 border-t">
          <p className="text-end text-[.65rem] text-gray-400">
            {format(hour, "h aa")}
          </p>
        </div>
      ))}
    </div>
  );
};
