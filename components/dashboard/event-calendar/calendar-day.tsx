"use client";

import { CalendarEvent } from "@prisma/client";
import {
  eachHourOfInterval,
  endOfDay,
  format,
  isSameDay,
  startOfDay,
} from "date-fns";
import { EventCard } from "./event";

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
    <div className="relative flex flex-1 flex-col border-l border-gray-200">
      {hours.map((hour, index) => (
        <div
          key={`time-label-${index}`}
          className="h-10 flex items-end justify-end border-gray-200 border-t"
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

        const displayTime = `${format(eventStart, "h:mm a")} - ${format(
          eventEnd,
          "h:mm a"
        )}`;

        return (
          <EventCard
            key={`${day}-event-${index}`}
            id={event.id}
            title={event.title}
            type={event.type}
            time={displayTime}
            description={event.description}
            top={`${startPercent}%`}
            height={`${durationPercent}%`}
          />
        );
      })}
    </div>
  );
};
