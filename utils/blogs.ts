import type { Blog } from "@/lib/blogs";
import { getInternalOrigin } from "@/lib/api-base-url";

export type { Blog };

async function fetchFromBlogApi<T>(path: string): Promise<T | null> {
  const origin = await getInternalOrigin();
  const res = await fetch(`${origin}${path}`, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export const BLOGS_PER_PAGE = 9;

export async function getAllBlogs(): Promise<Blog[]> {
  const data = await fetchFromBlogApi<{ blogs: Blog[] }>("/api/blogs");
  return data?.blogs ?? [];
}

export async function getBlogsPage(
  page: number,
  perPage = BLOGS_PER_PAGE
): Promise<{ blogs: Blog[]; total: number; totalPages: number }> {
  const data = await fetchFromBlogApi<{
    blogs: Blog[];
    total: number;
    totalPages: number;
  }>(`/api/blogs?page=${page}&perPage=${perPage}`);

  return {
    blogs: data?.blogs ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
  };
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const data = await fetchFromBlogApi<{ blog: Blog }>(`/api/blogs/${encodeURIComponent(slug)}`);
  return data?.blog ?? null;
}
