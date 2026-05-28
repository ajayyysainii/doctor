import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/blogs";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";

type EditBlogPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return <BlogEditorForm mode="edit" initial={blog} />;
}
