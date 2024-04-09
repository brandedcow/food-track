import { createContext, PropsWithChildren, useState } from "react";

interface DashboardContextType {
  date?: Date;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const DashboardContext = createContext<DashboardContextType>({
  date: new Date(),
  setDate: () => {},
});

export const DashboardContextProvider = ({ children }: PropsWithChildren) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardContext.Provider value={{ date, setDate }}>
      {children}
    </DashboardContext.Provider>
  );
};
