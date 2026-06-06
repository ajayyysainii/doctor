import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { getBlogsAdminPage } from "@/lib/blogs";
import { BlogDeleteButton } from "@/components/admin/BlogDeleteButton";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { Suspense } from "react";

const PER_PAGE = 10;

function statusBadge(published: boolean) {
  const base = "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold";
  return published
    ? `${base} bg-green-100 text-green-700`
    : `${base} bg-amber-100 text-amber-700`;
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogsAdminPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { blogs, total } = await getBlogsAdminPage(page, PER_PAGE);
  const totalPages = Math.ceil(total / PER_PAGE);

  // Clamp to last valid page if ?page= is out of range
  const clampedPage = Math.min(page, Math.max(1, totalPages));

  const publishedCount = blogs.filter((b) => b.published).length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create and edit patient education articles shown on the public site.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-900">{total}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Published</p>
            <p className="text-xl font-bold text-gray-900">{publishedCount}</p>
          </div>
          <Link
            href="/admin/dashboard/blogs/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                  <FileText className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  {total === 0
                    ? "No blog posts yet. Create your first article."
                    : "No posts on this page."}
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-gray-100 align-top">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{blog.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                      {blog.excerpt || "No excerpt"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(blog.published)}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{formatDate(blog.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {blog.published && (
                        <a
                          href={`/patient-education/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/admin/dashboard/blogs/${blog.id}`}
                        className="text-xs font-medium text-gray-700 hover:text-gray-900"
                      >
                        Edit
                      </Link>
                      <BlogDeleteButton id={blog.id} title={blog.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PaginationControls uses useSearchParams — wrap in Suspense per Next.js requirement */}
      <Suspense>
        <PaginationControls page={clampedPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
