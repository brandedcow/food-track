import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarEventType } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

interface EventCardProps {
  title?: string | null;
  description?: string | null;
  time: string;
  type: CalendarEventType;
  top: string | number;
  height: string | number;
}

export function EventCard({
  title,
  description,
  time,
  type,
  top,
  height,
}: EventCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //@ts-ignore
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          className={cn(
            "absolute w-[95%] hover:shadow-md hover:shadow-zinc-400 bg-blend-overlay",
            isSelected && "shadow-md shadow-zinc-400 bg-blend-overlay",
            type === CalendarEventType.Food &&
              "bg-green-600 hover:bg-green-600",
            type === CalendarEventType.Stool &&
              "bg-amber-600 hover:bg-amber-600",
            type === CalendarEventType.Note && "bg-blue-500 hover:bg-blue-500"
          )}
          style={{ top, height }}
          onClick={() => setIsSelected(true)}
          onBlur={() => setIsSelected(false)}
        >
          <p className="text-gray-100 truncate">{title}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-1">
        <h2 className="text-l font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{time}</p>
        <p className="text-sm">{description}</p>
      </PopoverContent>
    </Popover>
  );
}
