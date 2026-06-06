import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogImage } from "@/components/BlogImage";
import { getBlogFeaturedImage } from "@/utils/blogImage";
import { getAllBlogs, type Blog } from "@/utils/blogs";

export default async function FeaturedSection() {
  const blogs = (await getAllBlogs()).slice(0, 3);

  if (blogs.length === 0) return null;

  return (
    <section className="w-full bg-white py-20 font-sans sm:py-24">
      <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="text-sm font-bold tracking-[0.18em] text-[#008de4] uppercase">Featured</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {blogs.map((blog) => (
            <FeaturedCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/patient-education"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#008de4] px-8 py-3.5 text-[15px] font-bold text-[#008de4] transition hover:bg-[#008de4] hover:text-white"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/patient-education/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008de4]/30 hover:shadow-[0_18px_42px_rgba(0,141,228,0.12)]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-gray-100">
        <BlogImage
          src={getBlogFeaturedImage(blog.image)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-[#008de4] sm:text-[1.35rem]">
          {blog.title}
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-600 line-clamp-4">
          {blog.excerpt || "Open to read this article."}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="text-sm text-gray-400">Article</span>
          <span className="inline-flex items-center gap-0.5 text-sm font-bold text-[#008de4]">
            Learn more
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
