import { CalendarEvent } from "@prisma/client";
import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";

export const CALENDAR_TIME_LABEL_OFFSET = 60;

interface EventCalendarProps {
  events: CalendarEvent[];
}

export const EventCalendarContainer = ({ events }: EventCalendarProps) => {
  return (
    <div className="flex flex-col w-full">
      <CalendarHeader />
      <CalendarDaysOverview />
    </div>
  );
};
