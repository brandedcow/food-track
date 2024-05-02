import { eachHourOfInterval, endOfDay, format, startOfDay } from "date-fns";
import { v4 } from "uuid";

export const TimeLabel = () => {
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
