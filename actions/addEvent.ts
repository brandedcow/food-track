"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { CalendarEvent } from "@prisma/client";
import { redirect } from "next/navigation";

export const addEvent = async (data: Omit<CalendarEvent, "id" | "userId">) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      throw new Error("Invalid session");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.calendarEvent.create({
      data: {
        userId: user.id,
        ...data,
      },
    });
  } catch (error) {}

  redirect("/dashboard");
};
