import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { v4 } from "uuid";
import { TimeLabel } from "../event-calendar/time-label";
import { eachHourOfInterval, endOfDay, startOfDay } from "date-fns";

export default function EventCalendarSkeleton() {
  const hours = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });

  return (
    <div
      className={cn(
        "w-full h-full pl-2 pr-[1px] flex flex-col overflow-hidden",
        "laptop:pl-0"
      )}
    >
      <div className="w-full flex py-1 h-[40px] gap-x-2">
        <div className="basis-12" />
        {new Array(7).fill(null).map(() => (
          <Skeleton key={v4()} className="flex flex-1" />
        ))}
      </div>
      <div className="w-full h-full overflow-auto">
        <div className="flex">
          <TimeLabel />
          <div className="flex flex-1">
            {new Array(7).fill(null).map(() => (
              <div
                key={v4()}
                className="flex flex-1 flex-col border-l border-gray-200"
              >
                {hours.map((hour, index) => (
                  <div
                    key={`time-label-${index}`}
                    className="h-10 flex items-end justify-end border-gray-200 border-t"
                  >
                    <p className="text-sm text-gray-400"></p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
