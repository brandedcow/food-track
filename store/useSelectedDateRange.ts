import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface SelectedDateRangeState {
  selectedDateRange: DateRange;
  setSelectedDateRange: (range?: DateRange) => void;
}

const useSelectedDateRange = create<SelectedDateRangeState>((set) => ({
  selectedDateRange: {
    from: subDays(new Date(), 7),
    to: new Date(),
  },
  setSelectedDateRange: (range) =>
    set(() => ({ selectedDateRange: { from: range?.from, to: range?.to } })),

  // TODO: resetDateRange
}));

export default useSelectedDateRange;
