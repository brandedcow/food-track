"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { CalendarEvent } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type EditEventData = Pick<CalendarEvent, "start" | "end"> &
  Partial<CalendarEvent>;

export const editEvent = async (id: string, data: EditEventData) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      throw new Error("Invalid session");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.calendarEvent.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log("addEvent", { error });
  }

  revalidateTag("calendar-event");
  redirect("/dashboard");
};
