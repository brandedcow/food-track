import EventCalendarSkeleton from "@/components/dashboard/skeletons/event-calendar-skeleton";
import SidebarSkeleton from "@/components/dashboard/skeletons/sidebar-skeleton";
import { cn } from "@/lib/utils";

export default function LoadingDashboard() {
  return (
    <div className={cn("w-full flex flex-col-reverse", "laptop:flex-row")}>
      <SidebarSkeleton />
      <EventCalendarSkeleton />
    </div>
  );
}
