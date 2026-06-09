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
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="px-5 py-5 border-b border-gray-100">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Admin</p>
          <h2 className="mt-0.5 text-base font-bold text-gray-900">Dashboard</h2>
        </div>

        <div className="flex-1 px-3 py-3">
          <DashboardNav />
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#008de4] transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <h2 className="text-sm font-bold text-gray-900">Admin</h2>
          <Link href="/" className="text-sm text-[#008de4]">← Site</Link>
        </header>
        <div className="md:hidden border-b border-gray-200 bg-white">
          <DashboardNav variant="horizontal" />
        </div>

        <main className="flex-1 px-6 py-7 md:px-10 md:py-8">{children}</main>
      </div>
    </div>
  );
}
