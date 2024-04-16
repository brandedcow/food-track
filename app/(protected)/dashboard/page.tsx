"use client";

import { AddFoodForm } from "@/components/dashboard/add-food-form";
import { EventCalendarContainer } from "@/components/dashboard/event-calendar/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContextProvider } from "@/context/dashboard";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const searchParams = useSearchParams();

  const modal = searchParams.get("modal");

  return (
    <DashboardContextProvider className="flex overflow-hidden">
      <DashboardSidebar />
      <EventCalendarContainer events={[]} />
      <AddFoodForm isOpen={modal === "add-food"} />
    </DashboardContextProvider>
  );
}
