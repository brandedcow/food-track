import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, subDays } from "date-fns";
import useSelectedDateRange from "@/store/useSelectedDateRange";

type DateRangePickerProps = {};

export function DateRangePicker({}: DateRangePickerProps) {
  const { selectedDateRange, setSelectedDateRange } = useSelectedDateRange();

  const start = selectedDateRange.from ?? subDays(new Date(), 7);
  const end = selectedDateRange.to ?? new Date();

  const dateRangeString = `${format(new Date(start), "M/d/yy")} - ${format(
    new Date(end),
    "M/d/yy"
  )}`;

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">{dateRangeString}</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background rounded-md border-secondary border z-10">
        <Calendar
          mode="range"
          defaultMonth={new Date()}
          selected={selectedDateRange}
          onSelect={setSelectedDateRange}
          min={2}
          max={7}
        />
      </PopoverContent>
    </Popover>
  );
}
