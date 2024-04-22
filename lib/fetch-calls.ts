export const fetchEventCalendarData = async (
  start?: Date,
  end?: Date
): Promise<{ success: boolean; data?: any; error?: any }> => {
  if (!start || !end) {
    return { success: false, error: "Invalid dates" };
  }

  try {
    const response = await fetch(
      `/api/calendar-event?start=${start.getTime()}&end=${end.getTime()}`,
      {
        next: { tags: ["calendar-event"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("fetchEventCalendarData", error);
    return { success: false, error };
  }
};
