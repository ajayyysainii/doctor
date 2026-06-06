import { getAllPublishedBlogs, getPublishedBlogsPage } from "@/lib/blogs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = parseInt(searchParams.get("perPage") ?? "0", 10);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);

    if (perPage > 0) {
      const cappedPerPage = Math.min(50, Math.max(1, perPage));
      const { blogs, total } = await getPublishedBlogsPage(page, cappedPerPage);
      return Response.json({
        blogs,
        total,
        page,
        perPage: cappedPerPage,
        totalPages: Math.max(1, Math.ceil(total / cappedPerPage)),
      });
    }

    const blogs = await getAllPublishedBlogs();
    return Response.json({ blogs });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
