import { auth } from "@/auth";
import { getCalendarEventByRange } from "@/data/calendar-event";
import { NextRequest } from "next/server";
import status from "statuses";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json(
      { message: "Not authorized" },
      { status: status("unauthorized") }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
      return Response.json(
        { message: "Invalid query params" },
        { status: status("bad request") }
      );
    }

    const response = await getCalendarEventByRange({
      from: new Date(Number(start)),
      to: new Date(Number(end)),
    });

    return Response.json(response);
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
