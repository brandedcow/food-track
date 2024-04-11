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

interface DashboardContextProviderProps {
  className?: string;
}

export const DashboardContextProvider = ({
  children,
  className,
}: PropsWithChildren<DashboardContextProviderProps>) => {
  const [range, setRange] = useState<DateRange>(initialState.range);

  return (
    <div className={className}>
      <DashboardContext.Provider value={{ range, setRange }}>
        {children}
      </DashboardContext.Provider>
    </div>
  );
};
