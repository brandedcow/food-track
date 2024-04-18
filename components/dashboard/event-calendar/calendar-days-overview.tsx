"use client";

import {
  eachDayOfInterval,
  eachHourOfInterval,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";
import { CalendarDay } from "./calendar-day";
import { CALENDAR_TIME_LABEL_OFFSET } from "./container";

interface CalendarDaysOverviewProps {
  start: Date;
  end: Date;
}

export const CalendarDaysOverview = ({
  start,
  end,
}: CalendarDaysOverviewProps) => {
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
