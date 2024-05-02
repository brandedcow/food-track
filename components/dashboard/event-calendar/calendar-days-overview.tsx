"use client";

import { eachDayOfInterval } from "date-fns";
import { CalendarDay } from "./calendar-day";
import { CalendarEvent } from "@prisma/client";
import { TimeLabel } from "./time-label";

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
    <div className="w-full h-full overflow-auto">
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
