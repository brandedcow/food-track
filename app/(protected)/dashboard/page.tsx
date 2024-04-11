"use client";

import { CalendarWeekContainer } from "@/components/dashboard/calendar-week/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContextProvider } from "@/context/dashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1">
      <DashboardContextProvider>
        <DashboardSidebar />
        <CalendarWeekContainer />
      </DashboardContextProvider>
    </div>
  );
}
