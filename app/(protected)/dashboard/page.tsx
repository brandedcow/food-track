import { AddFoodForm } from "@/components/dashboard/add-food-form";
import { AddStoolForm } from "@/components/dashboard/add-stool-form";
import { EventCalendarContainer } from "@/components/dashboard/event-calendar/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex overflow-hidden">
      <DashboardSidebar />
      <EventCalendarContainer />
      <AddFoodForm />
      <AddStoolForm />
    </div>
  );
}
