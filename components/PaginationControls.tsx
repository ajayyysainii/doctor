"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  total?: number;
  perPage?: number;
};

export function PaginationControls({ page, totalPages, total, perPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function goTo(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  if (totalPages <= 1) return null;

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const rangeStart = total && perPage ? (page - 1) * perPage + 1 : null;
  const rangeEnd = total && perPage ? Math.min(page * perPage, total) : null;

  return (
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <p className="text-sm text-gray-500">
        {rangeStart && rangeEnd && total ? (
          <>
            Showing <span className="font-semibold text-gray-700">{rangeStart}–{rangeEnd}</span> of{" "}
            <span className="font-semibold text-gray-700">{total}</span> articles
          </>
        ) : (
          <>
            Page <span className="font-semibold text-gray-700">{page}</span> of{" "}
            <span className="font-semibold text-gray-700">{totalPages}</span>
          </>
        )}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#008de4]/30 hover:bg-[#f2f8fc] disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={[
                "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-colors",
                p === page
                  ? "border-[#008de4] bg-[#008de4] text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#008de4]/30 hover:bg-[#f2f8fc]",
              ].join(" ")}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#008de4]/30 hover:bg-[#f2f8fc] disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
