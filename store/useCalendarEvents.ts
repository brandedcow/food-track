import { CalendarEvent } from "@prisma/client";
import { create } from "zustand";

interface CalendarEventsState {
  calendarEvents: CalendarEvent[];
  setCalendarEvents: (events: CalendarEvent[]) => void;
}

const useCalendarEvents = create<CalendarEventsState>((set) => ({
  calendarEvents: [],
  setCalendarEvents: (events) => set(() => ({ calendarEvents: events })),
}));

export default useCalendarEvents;
