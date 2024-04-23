"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const deleteEvent = async (id: string) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      throw new Error("Invalid session");
    }

    await prisma.calendarEvent.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.warn("deleteEvent", { error });
  }

  revalidateTag("calendar-event");
  redirect("/dashboard");
};
