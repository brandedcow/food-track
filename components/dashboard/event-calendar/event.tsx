import { deleteEvent } from "@/actions/deleteEvent";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCalendarEventsAPI } from "@/fetch-hooks/calendarEvent";
import { cn } from "@/lib/utils";
import { CalendarEventType } from "@prisma/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface EventCardProps {
  id: string;
  title?: string | null;
  description?: string | null;
  time: string;
  type: CalendarEventType;
  top: string | number;
  height: string | number;
}

export function EventCard({
  id,
  title,
  description,
  time,
  type,
  top,
  height,
}: EventCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const buttonRef = useRef(null);
  const { fetchCalendarEvents } = useCalendarEventsAPI();

  let editForm;
  switch (type) {
    case CalendarEventType.Food:
      editForm = "edit-food";
      break;
    case CalendarEventType.Stool:
      editForm = "edit-stool";
      break;
    case CalendarEventType.Note:
      editForm = "edit-note";
      break;
    default:
      editForm = "edit-food";
      break;
  }

  const handleDeleteClick = async () => {
    await deleteEvent(id);
    await fetchCalendarEvents();
  };

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
      <ContextMenu>
        <ContextMenuTrigger>
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
                type === CalendarEventType.Note &&
                  "bg-blue-500 hover:bg-blue-500"
              )}
              style={{ top, height }}
              onClick={() => setIsSelected(true)}
              onBlur={() => setIsSelected(false)}
            >
              <p className="text-gray-100 truncate">{title}</p>
            </Button>
          </PopoverTrigger>
        </ContextMenuTrigger>

        <PopoverContent className="flex flex-col gap-y-1 select-none">
          <h2 className="text-l font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{time}</p>
          <p className="text-sm">{description}</p>
        </PopoverContent>

        <ContextMenuContent>
          <ContextMenuItem asChild>
            <Link
              href={{
                pathname: "/dashboard",
                query: { modal: editForm, id },
              }}
            >
              Edit
            </Link>
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDeleteClick}>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Popover>
  );
}
