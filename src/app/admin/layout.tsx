import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminCookieName, verifyAdminSession } from "@/lib/adminAuth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get(getAdminCookieName())?.value;
  const v = verifyAdminSession(token);
  if (!v.ok) redirect("/admin/login");
  return children;
}

