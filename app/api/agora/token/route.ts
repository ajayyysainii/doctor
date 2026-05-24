import { type NextRequest } from "next/server";
import { buildRtcTokenForUid } from "@/lib/agoraToken";
import { findBookingById } from "@/lib/bookings";
import { getAdminSession } from "@/lib/session";
import { isWithinJoinWindow } from "@/lib/slots";

/** Admin publisher UID vs patient UID — fixed for 1:1 consult. */
const UID_ADMIN = 1;
const UID_USER = 2;

export async function GET(request: NextRequest) {
  try {
    const bookingId = request.nextUrl.searchParams.get("bookingId");
    const role = request.nextUrl.searchParams.get("role") ?? "user";

    if (!bookingId) {
      return Response.json({ error: "missing_bookingId" }, { status: 400 });
    }

    if (role === "admin") {
      const ok = await getAdminSession();
      if (!ok) {
        return Response.json({ error: "unauthorized" }, { status: 403 });
      }
    } else if (role !== "user") {
      return Response.json({ error: "invalid_role" }, { status: 400 });
    }

    const booking = await findBookingById(bookingId);
    if (!booking || booking.status !== "paid") {
      return Response.json({ error: "booking_not_found" }, { status: 404 });
    }

    // Join window check disabled for now — re-enable when ready for production
    // if (role !== "admin" && !isWithinJoinWindow(booking.slotStart)) {
    //   console.warn(
    //     `[agora] outside_join_window — bookingId=${bookingId} slotStart=${booking.slotStart.toISOString()} now=${new Date().toISOString()}`,
    //   );
    //   return Response.json({ error: "outside_join_window" }, { status: 403 });
    // }


    const channelName = booking.agora?.channelName ?? booking.bookingId;
    const uid = role === "admin" ? UID_ADMIN : UID_USER;
    const { token, appId } = buildRtcTokenForUid({ channelName, uid });

    return Response.json({
      appid: appId,
      channel: channelName,
      token,
      uid,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
