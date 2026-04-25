import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

type BlogDocument = {
  _id: ObjectId;
  title?: string;
  content?: string;
  body?: string;
  content_html?: string;
  excerpt?: string;
  description?: string;
  image?: string;
  url?: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentHtml: string;
  excerpt: string;
  image: string;
  sourceUrl: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toPlainBlog(blog: BlogDocument): Blog {
  const title = blog.title?.trim() || "Untitled Blog";
  const id = blog._id.toString();
  const contentHtml = blog.content_html?.trim() || "";
  const content = blog.content?.trim() || blog.body?.trim() || stripHtml(contentHtml);
  const fallbackExcerptSource = content || stripHtml(contentHtml) || blog.description?.trim() || "";
  const excerpt =
    blog.excerpt?.trim() ||
    (fallbackExcerptSource
      ? `${fallbackExcerptSource.slice(0, 140)}${fallbackExcerptSource.length > 140 ? "..." : ""}`
      : "");

  return {
    id,
    title,
    slug: `${slugify(title) || "blog"}-${id}`,
    content,
    contentHtml,
    excerpt,
    image: blog.image?.trim() || "",
    sourceUrl: blog.url?.trim() || "",
  };
}

export async function getAllBlogs() {
  const client = await clientPromise;
  const db = client.db();
  const blogs = await db.collection<BlogDocument>("blogs").find({}).sort({ _id: -1 }).toArray();
  return blogs.map(toPlainBlog);
}

export async function getBlogBySlug(slug: string) {
  const blogs = await getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}
