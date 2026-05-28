import { deleteBlog, getBlogById, updateBlog } from "@/lib/blogs";
import { revalidateBlogPages } from "@/lib/revalidate-blogs";
import { getAdminSession } from "@/lib/session";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const blog = await getBlogById(id);
  if (!blog) return Response.json({ error: "not_found" }, { status: 404 });

  return Response.json({ blog });
}

export async function PATCH(request: Request, context: RouteContext) {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const data = body as {
    title?: string;
    contentHtml?: string;
    excerpt?: string;
    image?: string;
    published?: boolean;
  };

  try {
    const blog = await updateBlog(id, {
      title: data.title,
      contentHtml: data.contentHtml,
      excerpt: data.excerpt,
      image: data.image,
      published: data.published,
    });

    if (!blog) return Response.json({ error: "not_found" }, { status: 404 });

    revalidateBlogPages(blog.slug);

    return Response.json({ blog });
  } catch (err) {
    const message = err instanceof Error ? err.message : "update_failed";
    return Response.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const existing = await getBlogById(id);
  const deleted = await deleteBlog(id);

  if (!deleted) return Response.json({ error: "not_found" }, { status: 404 });

  if (existing?.published) revalidateBlogPages(existing.slug);

  return Response.json({ ok: true });
}
