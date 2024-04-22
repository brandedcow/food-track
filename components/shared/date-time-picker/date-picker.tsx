import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

interface DatePickerProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(date ?? new Date());

  const handleSelectDate = (selected?: Date) => {
    if (!!selected) setDate(selected);
  };

  useEffect(() => {
    if (!!date) {
      setSelectedDate(date);
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(selectedDate, "MMM dd, yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode="single" selected={date} onSelect={handleSelectDate} />
      </PopoverContent>
    </Popover>
  );
}
