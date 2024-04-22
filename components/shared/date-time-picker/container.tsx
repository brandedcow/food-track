import { DatePicker } from "./date-picker";
import { useState } from "react";
import { TimePicker } from "./time-picker";
import { format } from "date-fns";

type TimeRange = {
  start: Date;
  end: Date;
};
interface DateTimePickerProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<string>(
    format(value.start, "HH:mm")
  );
  const [endTime, setEndTime] = useState<string>(format(value.end, "HH:mm"));

  const handleChange = (type: "start" | "end") => (time: string) => {
    if (type === "start") {
      setStartTime(time);
    } else {
      setEndTime(time);
    }

    if (!time) return;

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = parseInt(time.split(":")[0]);
    const minute = parseInt(time.split(":")[1]);
    const second = 0;

    const newTime = new Date(year, month, day, hour, minute, second);

    onChange({
      ...value,
      [type]: newTime,
    });
  };

  return (
    <div className="flex gap-x-4">
      <DatePicker date={date} setDate={setDate} />
      <div className="flex items-center gap-x-1">
        <TimePicker time={startTime} setTime={handleChange("start")} />
        <p className="px-1">{"\u2013"}</p>
        <TimePicker time={endTime} setTime={handleChange("end")} />
      </div>
    </div>
  );
};
