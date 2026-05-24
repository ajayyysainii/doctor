import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminSessionValue, adminCookieName } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) {
      return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
    }

    const a = Buffer.from(password, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: "invalid_password" }, { status: 401 });
    }

    const value = createAdminSessionValue();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(adminCookieName, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
