import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ChevronRight, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import { getAllBlogs, getBlogBySlug } from "@/utils/blogs";
import { BOOK_PATH } from "@/utils/siteUrl";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orthodrskpalsania.com";

const FALLBACK_IMAGE = "/image.png";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

function formatBlogDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  const url = `${SITE_URL}/patient-education/${blog.slug}`;
  const description = blog.excerpt || blog.title;
  const ogImage = blog.image || "/og-image.png";

  return {
    title: blog.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: blog.title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
      siteName: "Dr. Suresh Palsania",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([getBlogBySlug(slug), getAllBlogs()]);

  if (!blog) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/patient-education/${blog.slug}`;
  const featuredImage = blog.image || FALLBACK_IMAGE;
  const publishedDate = formatBlogDate(blog.createdAt);
  const readTime = estimateReadTime(blog.content || blog.contentHtml);
  const relatedBlogs = allBlogs.filter((item) => item.slug !== blog.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.title,
    url: canonicalUrl,
    image: featuredImage,
    datePublished: blog.createdAt ?? new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Dr. Suresh Palsania",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Suresh Palsania",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full bg-white font-sans">
        <section className="relative overflow-hidden bg-[#031d2e] pb-32 pt-16 sm:pb-40 sm:pt-20">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="container relative mx-auto max-w-[1000px] px-6 lg:px-12">
            <Link
              href="/patient-education"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-blue-100 uppercase transition-colors hover:border-[#008de4]/70 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all blogs
            </Link>

            <p className="mt-6 text-sm font-bold tracking-[0.18em] text-blue-200 uppercase">
              Knowledge Center
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              {blog.title}
            </h1>
            {blog.excerpt ? (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-100/80 sm:text-lg">
                {blog.excerpt}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-blue-100/70">
              <span className="font-semibold text-blue-100">Dr. Suresh Palsania</span>
              {publishedDate ? (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#008de4]" />
                  {publishedDate}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#008de4]" />
                {readTime} min read
              </span>
            </div>
          </div>
        </section>

        <section className="relative -mt-24 pb-16 sm:-mt-28 sm:pb-20">
          <div className="container mx-auto max-w-[1000px] px-6 lg:px-12">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage}
                alt={blog.title}
                width={1000}
                height={562}
                className="aspect-video w-full object-cover"
              />
            </div>

            <article className="mt-8 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
              {blog.contentHtml ? (
                <div
                  className="blog-html"
                  dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
                />
              ) : (
                <div className="blog-html whitespace-pre-wrap">
                  {blog.content || "No content available."}
                </div>
              )}

              <div className="mt-12 flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#f2f8fc] p-5 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#008de4] text-sm font-black text-white">
                  SP
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Dr. Suresh Palsania</p>
                  <p className="text-sm text-gray-500">Orthopedic Surgeon · Sikar, Rajasthan</p>
                </div>
              </div>
            </article>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/patient-education"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#008de4] px-8 py-3.5 text-[15px] font-bold text-[#008de4] transition hover:bg-[#008de4] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                All articles
              </Link>
              <Link
                href={BOOK_PATH}
                className="inline-flex items-center justify-center rounded-lg bg-[#008de4] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600"
              >
                Book a consultation
              </Link>
            </div>
          </div>
        </section>

        {relatedBlogs.length > 0 ? (
          <section className="border-t border-gray-100 bg-[#f2f8fc] py-16 sm:py-20">
            <div className="container mx-auto max-w-[1400px] px-6 lg:px-12">
              <p className="text-sm font-bold tracking-[0.18em] text-[#008de4] uppercase">
                Keep Reading
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                More patient education
              </h2>

              <div className="mt-8 grid gap-5">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related.id}
                    href={`/patient-education/${related.slug}`}
                    className="group block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008de4]/40 hover:shadow-[0_18px_42px_rgba(0,141,228,0.14)]"
                  >
                    <h3 className="text-2xl font-black tracking-tight text-gray-900 transition-colors group-hover:text-[#008de4]">
                      {related.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-600">
                      {related.excerpt || "Open to read this article."}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 rounded-lg bg-[#008de4] px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-blue-600">
                      Read article
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
