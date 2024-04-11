import { eachHourOfInterval, endOfDay, format, startOfDay } from "date-fns";

interface CalendarDayProps {
  day: Date;
}

export const CalendarDay = ({ day }: CalendarDayProps) => {
  const hours = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  return (
    <div className="flex flex-1 flex-col border-l border-gray-100">
      {hours.map((hour, index) => (
        <div
          key={`time-label-${index}`}
          className="h-10 flex items-end justify-end"
        >
          <p className="text-sm text-gray-400"></p>
        </div>
      ))}
    </div>
  );
};
