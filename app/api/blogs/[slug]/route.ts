import { getBlogBySlug } from "@/lib/blogs";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }

    return Response.json({ blog });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
