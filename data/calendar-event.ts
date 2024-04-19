import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "./user";

export const getCalendarEventByRange = async ({
  from,
  to,
}: {
  from: Date;
  to: Date;
}) => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      throw new Error("Invalid session");
    }

    const user = await getUserByEmail(session.user.email);

    if (!user) {
      throw new Error("User not found");
    }

    const data = await prisma.calendarEvent.findMany({
      where: {
        userId: user.id,
        start: {
          gte: from,
        },
        end: {
          lte: to,
        },
      },
    });
    return { data, success: true };
  } catch (error) {
    return { error, success: false };
  }
};
