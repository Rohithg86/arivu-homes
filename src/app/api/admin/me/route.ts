import { NextRequest, NextResponse } from "next/server";
import { getAdminCookieName, verifyAdminSession } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(getAdminCookieName())?.value;
  const v = verifyAdminSession(token);
  return NextResponse.json({ isAdmin: v.ok });
}

