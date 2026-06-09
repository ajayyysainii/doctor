import Link from "next/link";
import { Plus } from "lucide-react";
import { getBlogsAdminPage } from "@/lib/blogs";
import { BlogDeleteButton } from "@/components/admin/BlogDeleteButton";
import { PaginationControls } from "@/components/admin/PaginationControls";
import { Suspense } from "react";

const PER_PAGE = 10;

function statusBadge(published: boolean) {
  return published
    ? "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border border-green-200"
    : "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200";
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
  const clampedPage = Math.min(page, Math.max(1, totalPages));

  const publishedCount = blogs.filter((b) => b.published).length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Blog Management</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Create and edit patient education articles shown on the public site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-4 text-sm text-gray-600 border border-gray-200 bg-white rounded-lg px-4 py-2">
            <span><strong className="text-gray-900">{total}</strong> total</span>
            <span className="text-gray-300">|</span>
            <span><strong className="text-gray-900">{publishedCount}</strong> published</span>
          </div>
          <Link
            href="/admin/dashboard/blogs/new"
            className="inline-flex items-center gap-1.5 rounded bg-[#008de4] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Title</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Updated</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-14 text-center text-sm text-gray-400">
                  {total === 0
                    ? "No blog posts yet. Create your first article."
                    : "No posts on this page."}
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition-colors align-top">
                  <td className="px-4 py-3 max-w-sm">
                    <p className="font-medium text-gray-900">{blog.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                      {blog.excerpt || "No excerpt"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadge(blog.published)}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(blog.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {blog.published && (
                        <a
                          href={`/patient-education/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#008de4] hover:underline"
                        >
                          View
                        </a>
                      )}
                      <Link
                        href={`/admin/dashboard/blogs/${blog.id}`}
                        className="text-sm text-gray-600 hover:text-gray-900"
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

      <Suspense>
        <PaginationControls page={clampedPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
