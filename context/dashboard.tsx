import { subDays } from "date-fns";
import { createContext, PropsWithChildren, useState } from "react";
import { DateRange } from "react-day-picker";
interface DashboardContextType {
  range?: DateRange;
  setRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

const today = new Date();

const initialState = {
  range: {
    from: subDays(today, 6),
    to: today,
  },
  setRange: () => {},
};

export const DashboardContext =
  createContext<DashboardContextType>(initialState);

export const DashboardContextProvider = ({ children }: PropsWithChildren) => {
  const [range, setRange] = useState<DateRange>(initialState.range);

  return (
    <DashboardContext.Provider value={{ range, setRange }}>
      {children}
    </DashboardContext.Provider>
  );
};
