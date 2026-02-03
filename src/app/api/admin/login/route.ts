import { NextRequest, NextResponse } from "next/server";
import { getAdminCookieName, signAdminSession } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { username, password } = (await req.json().catch(() => ({}))) as {
    username?: string;
    password?: string;
  };

  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "arivu@1234";

  if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminSession(60 * 60 * 24 * 7); // 7 days
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

