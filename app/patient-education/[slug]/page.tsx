import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getAllBlogs, getBlogBySlug } from "@/utils/blogs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orthodrskpalsania.com";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
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
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/patient-education/${blog.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.title,
    url: canonicalUrl,
    image: blog.image || `${SITE_URL}/og-image.png`,
    datePublished: new Date().toISOString(),
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
        <section className="relative overflow-hidden bg-[#031d2e] py-18 sm:py-22">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="container relative mx-auto max-w-[1400px] px-6 lg:px-12">
            <Link
              href="/patient-education"
              className="inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-blue-100 uppercase transition-colors hover:border-[#008de4]/70 hover:text-white"
            >
              ← Back to all blogs
            </Link>
            <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">{blog.title}</h1>
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className="container mx-auto max-w-[1000px] px-6 lg:px-12">
            <article className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10">
              {blog.contentHtml ? (
                <div className="blog-html mt-1" dangerouslySetInnerHTML={{ __html: blog.contentHtml }} />
              ) : (
                <div className="blog-html mt-1 whitespace-pre-wrap">{blog.content || "No content available."}</div>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
