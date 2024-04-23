import useCalendarEvents from "@/store/useCalendarEvents";
import useSelectedDateRange from "@/store/useSelectedDateRange";
import { endOfDay, startOfDay } from "date-fns";

export const useCalendarEventsAPI = () => {
  const { selectedDateRange } = useSelectedDateRange();
  const { setCalendarEvents } = useCalendarEvents();

  const fetchCalendarEvents = async () => {
    const { from, to } = selectedDateRange;
    if (!from || !to) return;

    const start = startOfDay(from).getTime();
    const end = endOfDay(to).getTime();

    try {
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
  };

  return {
    fetchCalendarEvents,
  };
};
