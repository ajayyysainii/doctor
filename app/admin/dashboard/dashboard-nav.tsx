"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarClock, FileText, IndianRupee } from "lucide-react";

const items = [
  {
    href: "/admin/dashboard/consultations",
    label: "Consultations",
    icon: CalendarClock,
  },
  {
    href: "/admin/dashboard/payments",
    label: "Payments",
    icon: IndianRupee,
  },
  {
    href: "/admin/dashboard/blogs",
    label: "Blogs",
    icon: FileText,
  },
] as const;

export function DashboardNav({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
  const pathname = usePathname() ?? "";

  if (variant === "horizontal") {
    return (
      <nav className="flex gap-2 overflow-x-auto border-b border-gray-200 bg-white px-4 py-2">
        {items.map((it) => {
          const active = pathname.startsWith(it.href);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${
                active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
    <nav className="flex flex-col gap-1 px-4">
      {items.map((it) => {
        const active = pathname.startsWith(it.href);
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
              active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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
