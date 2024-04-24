import useCalendarEvents from "@/store/useCalendarEvents";
import useSelectedDateRange from "@/store/useSelectedDateRange";
import { endOfDay, startOfDay } from "date-fns";
import { useCallback } from "react";

export const useCalendarEventsAPI = () => {
  const { selectedDateRange } = useSelectedDateRange();
  const { setCalendarEvents } = useCalendarEvents();

  const fetchCalendarEvents = useCallback(async () => {
    const { from, to } = selectedDateRange;
    if (!from || !to) return;

    const start = startOfDay(from).getTime();
    const end = endOfDay(to).getTime();

    try {
      console.log("fetching");
      const response = await fetch(
        `/api/calendar-event?start=${start}&end=${end}`,
        {
          next: { tags: ["calendar-event"] },
        }
      );
      const { success, data } = await response.json();
      if (success && data) {
        setCalendarEvents(data);
      }
    } catch (error) {
      console.warn("useCalendarEventsAPI", error);
    }
  }, [selectedDateRange, setCalendarEvents]);

  return {
    fetchCalendarEvents,
  };
};
