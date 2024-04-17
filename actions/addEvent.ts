"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { CalendarEvent } from "@prisma/client";

export const addEvent = async (
  email: string,
  data: Omit<CalendarEvent, "id" | "userId">
) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.calendarEvent.create({
      data: {
        userId: user.id,
        ...data,
      },
    });

    return { success: true };
  } catch (error) {
    return { error };
  }
};
