"use client";

import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  isSameDay,
  startOfDay,
} from "date-fns";
import { CalendarDay } from "./calendar-day";
import { CALENDAR_TIME_LABEL_OFFSET } from "./container";
import { CalendarEvent } from "@prisma/client";

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
    <div className="flex flex-col overflow-y-scroll">
      <div className="flex ">
        <TimeLabel />
        <div className="flex w-full">
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
