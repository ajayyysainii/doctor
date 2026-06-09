"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarClock, FileText, IndianRupee } from "lucide-react";

const items = [
  { href: "/admin/dashboard/consultations", label: "Consultations", icon: CalendarClock },
  { href: "/admin/dashboard/payments", label: "Payments", icon: IndianRupee },
  { href: "/admin/dashboard/blogs", label: "Blogs", icon: FileText },
] as const;

export function DashboardNav({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
  const pathname = usePathname() ?? "";

  if (variant === "horizontal") {
    return (
      <nav className="flex gap-1 overflow-x-auto px-3 py-2">
        {items.map((it) => {
          const active = pathname.startsWith(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#008de4] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((it) => {
        const active = pathname.startsWith(it.href);
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex items-center gap-2.5 rounded px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-[#008de4]/10 text-[#008de4]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
