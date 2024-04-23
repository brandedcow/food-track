import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface TimePickerProps {
  time: string;
  setTime: (time: string) => void;
}

export function TimePicker({ time, setTime }: TimePickerProps) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setTime(inputValue);
  };

  const handleClick = () => {
    console.log("clicked");
    // TODO: Add Select Dropdown for every 15 or 30 minutes for easy selection
  };

  const handleBlur = () => {
    console.log("on blur");
  };

  return (
    <Input
      className={cn(inter.className, "font-medium")}
      type="time"
      value={time}
      onChange={handleChange}
      onClick={handleClick}
      onBlur={handleBlur}
    />
  );
}
