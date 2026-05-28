import { createBlog, getAllBlogsAdmin } from "@/lib/blogs";
import { revalidateBlogPages } from "@/lib/revalidate-blogs";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

  const blogs = await getAllBlogsAdmin();
  return Response.json({ blogs });
}

export async function POST(request: Request) {
  const ok = await getAdminSession();
  if (!ok) return Response.json({ error: "unauthorized" }, { status: 401 });

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

  const title = data.title?.trim();
  if (!title) return Response.json({ error: "title_required" }, { status: 400 });

  try {
    const blog = await createBlog({
      title,
      contentHtml: data.contentHtml ?? "",
      excerpt: data.excerpt,
      image: data.image,
      published: data.published,
    });

    if (blog.published) revalidateBlogPages(blog.slug);

    return Response.json({ blog }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "create_failed";
    return Response.json({ error: message }, { status: 400 });
  }
}
