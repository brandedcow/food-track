import { cn } from "@/lib/utils";
import { CalendarEventType } from "@prisma/client";

interface EventCardProps {
  title?: string | null;
  type: CalendarEventType;
  top: string | number;
  height: string | number;
}

export function EventCard({ title, type, top, height }: EventCardProps) {
  return (
    <div
      className={cn(
        `absolute w-[95%] flex justify-center items-center p-1 bg-green-600 rounded-sm `,
        type === CalendarEventType.Stool && "bg-amber-600"
      )}
      style={{
        top,
        height,
      }}
    >
      <p className="text-gray-100 truncate px-1">{title}</p>
    </div>
  );
}
