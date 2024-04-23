import { endOfDay, startOfDay } from "date-fns";

export const fetchEventCalendarData = async (
  start?: Date,
  end?: Date
): Promise<{ success: boolean; data?: any; error?: any }> => {
  if (!start || !end) {
    return { success: false, error: "Invalid dates" };
  }

  try {
    const from = startOfDay(start).getTime();
    const to = endOfDay(end).getTime();

    const response = await fetch(
      `/api/calendar-event?start=${from}&end=${to}`,
      {
        next: { tags: ["calendar-event"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.warn("fetchEventCalendarData", error);
    return { success: false, error };
  }
};
