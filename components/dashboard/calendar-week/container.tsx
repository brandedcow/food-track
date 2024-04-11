import { CalendarDaysOverview } from "./calendar-days-overview";
import { CalendarHeader } from "./header";

export const CalendarWeekContainer = () => {
  return (
    <div className="block w-full">
      <CalendarHeader />
      <CalendarDaysOverview />
    </div>
  );
};
