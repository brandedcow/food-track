"use client";

import { CalendarWeekOverview } from "@/components/dashboard/calendar-week/overview";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContextProvider } from "@/context/dashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <DashboardContextProvider>
      <div className="flex flex-1">
        <DashboardSidebar />
        <CalendarWeekOverview />
      </div>
    </DashboardContextProvider>
  );
}
