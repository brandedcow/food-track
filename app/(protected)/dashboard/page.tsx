"use client";

import { EventCalendarContainer } from "@/components/dashboard/event-calendar/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContextProvider } from "@/context/dashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <DashboardContextProvider className="flex overflow-hidden">
      <DashboardSidebar />
      <EventCalendarContainer />
    </DashboardContextProvider>
  );
}
