"use client";

import { cn } from "@/lib/utils";
import { CalendarEvent, CalendarEventType } from "@prisma/client";
import { eachHourOfInterval, endOfDay, isSameDay, startOfDay } from "date-fns";

interface CalendarDayProps {
  day: Date;
  events: CalendarEvent[];
}

export const CalendarDay = ({ day, events }: CalendarDayProps) => {
  const startInMilliseconds = startOfDay(day).getTime();
  const endInMilliseconds = endOfDay(day).getTime();

  const hours = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  const dayEvents = events.filter((event) =>
    isSameDay(new Date(day), new Date(event.start))
  );

  return (
    <div className="relative flex flex-1 flex-col border-l border-gray-100">
      {hours.map((hour, index) => (
        <div
          key={`time-label-${index}`}
          className="h-10 flex items-end justify-end"
        >
          <p className="text-sm text-gray-400"></p>
        </div>
      ))}
      {dayEvents.map((event, index) => {
        const eventStart = new Date(event.start).getTime();
        const eventEnd = new Date(event.end).getTime();

        const startPercent =
          ((eventStart - startInMilliseconds) /
            (endInMilliseconds - startInMilliseconds)) *
          100;

        const endPercent =
          ((eventEnd - startInMilliseconds) /
            (endInMilliseconds - startInMilliseconds)) *
          100;

        const durationPercent = endPercent - startPercent;

        return (
          <div
            key={`${day}-event-${index}`}
            className={cn(
              `absolute w-full flex justify-center items-center p-3 bg-green-300`,
              event.type === CalendarEventType.Stool && "bg-amber-600"
            )}
            style={{
              top: `${startPercent}%`,
              minHeight: `${durationPercent}%`,
            }}
          >
            <p>{event.title}</p>
          </div>
        );
      })}
    </div>
  );
};
