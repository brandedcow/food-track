import { AddFoodForm } from "@/components/dashboard/add-food-form";
import { AddNoteForm } from "@/components/dashboard/add-note-form";
import { AddStoolForm } from "@/components/dashboard/add-stool-form";
import { EditFoodForm } from "@/components/dashboard/edit-food-form";
import { EditNoteForm } from "@/components/dashboard/edit-note-form";
import { EditStoolForm } from "@/components/dashboard/edit-stool-form";
import { EventCalendarContainer } from "@/components/dashboard/event-calendar/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className={cn("w-full flex flex-col-reverse", "laptop:flex-row")}>
      <DashboardSidebar />
      <EventCalendarContainer />

      <AddFoodForm />
      <AddStoolForm />
      <AddNoteForm />
      <EditFoodForm />
      <EditStoolForm />
      <EditNoteForm />
    </div>
  );
}
