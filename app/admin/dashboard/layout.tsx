import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminCookieName, verifyAdminSessionValue } from "@/lib/session";
import { DashboardNav } from "./dashboard-nav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  if (!verifyAdminSessionValue(jar.get(adminCookieName)?.value)) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
        <div className="px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Admin</p>
          <h2 className="mt-1 text-lg font-bold text-gray-900">Dashboard</h2>
        </div>
        <DashboardNav />
        <div className="mt-auto px-6 py-6">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
            Back to site
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <h2 className="text-base font-bold">Admin</h2>
          <Link href="/" className="text-sm font-medium text-blue-600">
            Site
          </Link>
        </header>
        <div className="md:hidden">
          <DashboardNav variant="horizontal" />
        </div>
        <main className="flex-1 px-4 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
