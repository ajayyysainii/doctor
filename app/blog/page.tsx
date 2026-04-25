import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllBlogs } from "@/utils/blogs";

export const revalidate = false;

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
  alternates: { canonical: "https://www.drsureshpalsania.in/blog" },
  openGraph: {
    type: "website",
    url: "https://www.drsureshpalsania.in/blog",
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

export default async function BlogListPage() {
  const blogs = await getAllBlogs();

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
            <p className="text-sm font-bold tracking-[0.18em] text-blue-200 uppercase">Knowledge Center</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">Our Blogs</h1>
            <p className="mt-4 max-w-2xl text-base text-blue-100/80 sm:text-lg">
              Trusted orthopedic insights, recovery guidance, and patient education.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">
            {blogs.length === 0 ? (
              <p className="rounded-2xl border border-gray-200 bg-[#f2f8fc] p-6 text-sm text-gray-700">
                No blogs found in the MongoDB `blogs` collection.
              </p>
            ) : (
              <div className="grid gap-5">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008de4]/40 hover:shadow-[0_18px_42px_rgba(0,141,228,0.14)]"
                  >
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-[#008de4] uppercase">
                      Blog Article
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-[#008de4]">
                      {blog.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-600">
                      {blog.excerpt || "Open to read this article."}
                    </p>
                    <p className="mt-4 inline-flex rounded-lg bg-[#008de4] px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-blue-600">
                      Read article
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
