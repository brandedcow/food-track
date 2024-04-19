import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import status from "statuses";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return Response.json(
        { message: "Not authorized" },
        { status: status("unauthorized") }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    if (!start || !end) {
      return Response.json(
        { message: "Invalid query params" },
        { status: status("bad request") }
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: status("not found") }
      );
    }

    const response = await prisma.calendarEvent.findMany({
      where: {
        userId: user.id,
        start: {
          gte: new Date(Number(start)),
        },
        end: {
          lte: new Date(Number(end)),
        },
      },
    });
    return Response.json({ success: true, data: response });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
