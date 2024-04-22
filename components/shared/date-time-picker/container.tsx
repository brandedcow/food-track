import { DatePicker } from "./date-picker";
import { useState } from "react";
import { TimePicker } from "./time-picker";
import { addMinutes, format } from "date-fns";

interface DateTimePickerProps {}

export const DateTimePicker = ({}: DateTimePickerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>(
    date ? format(date, "HH:mm") : ""
  );
  const [endTime, setEndTime] = useState<string>(
    date ? format(addMinutes(date, 10), "HH:mm") : ""
  );

  return (
    <div className="flex gap-x-4">
      <DatePicker date={date} setDate={setDate} />
      <div className="flex items-center gap-x-1">
        <TimePicker time={startTime} setTime={setStartTime} />
        <p> – </p>
        <TimePicker time={endTime} setTime={setEndTime} />
      </div>
    </div>
  );
};
