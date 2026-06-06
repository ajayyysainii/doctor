import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import { PaginationControls } from "@/components/PaginationControls";
import { BLOGS_PER_PAGE, getBlogsPage, type Blog } from "@/utils/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orthopedic Health Blog — Expert Articles by Dr. Suresh Palsania",
  description:
    "Browse expert orthopedic articles covering joint replacement, knee & hip care, spine health, sports medicine, and patient recovery tips by Dr. Suresh Palsania, Sikar.",
  keywords: [
    "orthopedic blog",
    "joint replacement articles",
    "knee pain tips",
    "hip replacement recovery",
    "spine health",
    "Dr. Suresh Palsania blog",
    "orthopedic health guide",
    "bone health Sikar",
  ],
  alternates: { canonical: "https://www.orthodrskpalsania.com/patient-education" },
  openGraph: {
    type: "website",
    url: "https://www.orthodrskpalsania.com/patient-education",
    title: "Orthopedic Health Blog — Dr. Suresh Palsania",
    description:
      "Expert orthopedic articles on joint replacement, knee & hip care, spine health and sports medicine.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dr. Suresh Palsania Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orthopedic Health Blog — Dr. Suresh Palsania",
    description: "Expert orthopedic articles on joint health, surgery tips, and patient care.",
    images: ["/og-image.png"],
  },
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800",
];

function getBlogImage(blog: Blog, index: number) {
  return blog.image?.trim() || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function formatBlogDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogListPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const { blogs, total, totalPages } = await getBlogsPage(page, BLOGS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(1, totalPages));

  return (
    <>
      <main className="w-full bg-white font-sans">
        <section className="relative overflow-hidden bg-[#031d2e] py-20 sm:py-24">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="container relative mx-auto max-w-[1400px] px-6 lg:px-12">
            <p className="text-sm font-bold tracking-[0.18em] text-blue-200 uppercase">
              Knowledge Center
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">
              Patient Education
            </h1>
            <p className="mt-4 max-w-2xl text-base text-blue-100/80 sm:text-lg">
              Trusted orthopedic insights, recovery guidance, and patient education.
            </p>
            {total > 0 ? (
              <p className="mt-6 inline-flex rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                {total} article{total === 1 ? "" : "s"} available
              </p>
            ) : null}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">
            {blogs.length === 0 ? (
              <p className="rounded-2xl border border-gray-200 bg-[#f2f8fc] p-6 text-sm text-gray-700">
                No articles published yet. Check back soon for orthopedic health guides and recovery
                tips.
              </p>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {blogs.map((blog, index) => (
                    <BlogCard key={blog.id} blog={blog} index={index} />
                  ))}
                </div>

                <Suspense>
                  <PaginationControls
                    page={currentPage}
                    totalPages={totalPages}
                    total={total}
                    perPage={BLOGS_PER_PAGE}
                  />
                </Suspense>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const date = formatBlogDate(blog.createdAt);

  return (
    <Link
      href={`/patient-education/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008de4]/30 hover:shadow-[0_18px_42px_rgba(0,141,228,0.12)]"
    >
      <div className="aspect-16/10 overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBlogImage(blog, index)}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {date ? (
          <p className="text-xs font-bold tracking-[0.12em] text-gray-400 uppercase">{date}</p>
        ) : null}
        <h2 className="mt-1 text-xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-[#008de4] sm:text-[1.35rem]">
          {blog.title}
        </h2>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-600 line-clamp-3">
          {blog.excerpt || "Open to read this article."}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <span className="text-sm text-gray-400">Article</span>
          <span className="inline-flex items-center gap-0.5 text-sm font-bold text-[#008de4]">
            Read article
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
