import type { Collection, WithId } from "mongodb";
import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

export type BlogDocument = {
  title?: string;
  content?: string;
  body?: string;
  content_html?: string;
  excerpt?: string;
  description?: string;
  image?: string;
  url?: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type BlogInput = {
  title: string;
  contentHtml: string;
  excerpt?: string;
  image?: string;
  published?: boolean;
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

export function toPlainBlog(blog: WithId<BlogDocument>): Blog {
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
    published: blog.published !== false,
    createdAt: blog.createdAt?.toISOString() ?? null,
    updatedAt: blog.updatedAt?.toISOString() ?? null,
  };
}

export async function getBlogsCollection(): Promise<Collection<BlogDocument>> {
  const client = await clientPromise;
  return client.db().collection<BlogDocument>("blogs");
}

const publishedFilter = {
  $or: [{ published: { $exists: false } }, { published: true }],
};

export async function getAllPublishedBlogs(): Promise<Blog[]> {
  const col = await getBlogsCollection();
  const blogs = await col.find(publishedFilter).sort({ _id: -1 }).toArray();
  return blogs.map(toPlainBlog);
}

export async function getAllBlogsAdmin(): Promise<Blog[]> {
  const col = await getBlogsCollection();
  const blogs = await col.find({}).sort({ _id: -1 }).toArray();
  return blogs.map(toPlainBlog);
}

export async function getBlogsAdminPage(
  page: number,
  perPage: number
): Promise<{ blogs: Blog[]; total: number }> {
  const col = await getBlogsCollection();
  const skip = (page - 1) * perPage;
  const [blogs, total] = await Promise.all([
    col.find({}).sort({ _id: -1 }).skip(skip).limit(perPage).toArray(),
    col.countDocuments({}),
  ]);
  return { blogs: blogs.map(toPlainBlog), total };
}

export async function getPublishedBlogsPage(
  page: number,
  perPage: number
): Promise<{ blogs: Blog[]; total: number }> {
  const col = await getBlogsCollection();
  const skip = (page - 1) * perPage;
  const [blogs, total] = await Promise.all([
    col.find(publishedFilter).sort({ _id: -1 }).skip(skip).limit(perPage).toArray(),
    col.countDocuments(publishedFilter),
  ]);
  return { blogs: blogs.map(toPlainBlog), total };
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const blogs = await getAllPublishedBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}

export async function getBlogById(id: string): Promise<Blog | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await getBlogsCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? toPlainBlog(doc) : null;
}

export async function createBlog(input: BlogInput): Promise<Blog> {
  const title = input.title.trim();
  if (!title) throw new Error("Title is required");

  const now = new Date();
  const col = await getBlogsCollection();
  const result = await col.insertOne({
    title,
    content_html: input.contentHtml.trim(),
    excerpt: input.excerpt?.trim() || "",
    image: input.image?.trim() || "",
    published: input.published ?? false,
    createdAt: now,
    updatedAt: now,
  });

  const created = await col.findOne({ _id: result.insertedId });
  if (!created) throw new Error("Failed to create blog");
  return toPlainBlog(created);
}

export async function updateBlog(id: string, input: Partial<BlogInput>): Promise<Blog | null> {
  if (!ObjectId.isValid(id)) return null;

  const updates: Partial<BlogDocument> = { updatedAt: new Date() };
  if (input.title !== undefined) {
    const title = input.title.trim();
    if (!title) throw new Error("Title is required");
    updates.title = title;
  }
  if (input.contentHtml !== undefined) updates.content_html = input.contentHtml.trim();
  if (input.excerpt !== undefined) updates.excerpt = input.excerpt.trim();
  if (input.image !== undefined) updates.image = input.image.trim();
  if (input.published !== undefined) updates.published = input.published;

  const col = await getBlogsCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: "after" },
  );

  return result ? toPlainBlog(result) : null;
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const col = await getBlogsCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
