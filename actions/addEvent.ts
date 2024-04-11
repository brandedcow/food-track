"use server";

import { prisma } from "@/lib/db";
import { CalendarEvent } from "@prisma/client";

export const addEvent = async (data: CalendarEvent) => {
  try {
    const newEvent = await prisma.calendarEvent.create({
      data,
    });
  } catch (error) {}
};
