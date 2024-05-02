import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, subDays } from "date-fns";
import useSelectedDateRange from "@/store/useSelectedDateRange";

type DateRangePickerProps = {
  mode?: "calendar" | "button";
  className?: string;
};

export function DateRangePicker({
  mode = "button",
  className,
}: DateRangePickerProps) {
  const { selectedDateRange, setSelectedDateRange } = useSelectedDateRange();
  const today = new Date();

  const start = selectedDateRange.from ?? subDays(today, 7);
  const end = selectedDateRange.to ?? today;

  const dateRangeString = `${format(new Date(start), "M/d/yy")} - ${format(
    new Date(end),
    "M/d/yy"
  )}`;

  return (
    <>
      {mode === "button" ? (
        <Popover>
          <PopoverTrigger asChild className={className}>
            <Button variant="outline">{dateRangeString}</Button>
          </PopoverTrigger>
          <PopoverContent className="bg-background rounded-md border-secondary border z-10">
            <Calendar
              mode="range"
              defaultMonth={today}
              selected={selectedDateRange}
              onSelect={setSelectedDateRange}
              min={2}
              max={7}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Calendar
          className={className}
          mode="range"
          defaultMonth={today}
          selected={selectedDateRange}
          onSelect={setSelectedDateRange}
          min={2}
          max={7}
        />
      )}
    </>
  );
}
