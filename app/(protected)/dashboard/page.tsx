"use client";

import { AddFoodForm } from "@/components/dashboard/add-food-form";
import { AddStoolForm } from "@/components/dashboard/add-stool-form";
import { EventCalendarContainer } from "@/components/dashboard/event-calendar/container";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContextProvider } from "@/context/dashboard";
import React from "react";

export default function DashboardPage() {
  return (
    <DashboardContextProvider className="flex overflow-hidden">
      <DashboardSidebar />
      <EventCalendarContainer />
      <AddFoodForm />
      <AddStoolForm />
    </DashboardContextProvider>
  );
}
