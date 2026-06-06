"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ExternalLink, Loader2, Save, Upload, X } from "lucide-react";
import type { Blog } from "@/lib/blogs";
import { RichTextEditor } from "./RichTextEditor";
import { uploadToS3 } from "@/utils/uploadToS3";

type BlogEditorFormProps = {
  mode: "create" | "edit";
  initial?: Blog;
};

export function BlogEditorForm({ mode, initial }: BlogEditorFormProps) {
  const router = useRouter();
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [contentHtml, setContentHtml] = useState(initial?.contentHtml ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = { title, excerpt, image, contentHtml, published };
    const url = mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { blog?: Blog; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }

      router.push("/admin/dashboard/blogs");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const previewSlug = initial?.slug;

  async function handleFeaturedImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploadingFeatured(true);
    try {
      const url = await uploadToS3(file, "blog-featured");
      setImage(url);
    } catch (err) {
      setError(`Featured image upload failed: ${err instanceof Error ? err.message : "unknown"}`);
    } finally {
      setUploadingFeatured(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "New blog post" : "Edit blog post"}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Write patient education articles with rich formatting. Publish when ready.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/dashboard/blogs"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          {previewSlug && published && (
            <a
              href={`/patient-education/${previewSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" />
              View live
            </a>
          )}
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Knee replacement recovery tips"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Content</label>
            <RichTextEditor value={contentHtml} onChange={setContentHtml} />
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900">Publish</h2>
            <label className="mt-3 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {published ? "Published — visible on site" : "Draft — hidden from site"}
              </span>
            </label>
            {previewSlug && (
              <p className="mt-3 break-all font-mono text-xs text-gray-500">
                /patient-education/{previewSlug}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <label htmlFor="excerpt" className="mb-1.5 block text-sm font-bold text-gray-900">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              rows={4}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary for listings and SEO..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <p className="mt-2 text-xs text-gray-500">Leave blank to auto-generate from content.</p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-gray-900">Featured image</h2>

            {/* Hidden file input */}
            <input
              ref={featuredInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={handleFeaturedImageChange}
            />

            {image ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Featured preview"
                  className="w-full rounded-lg border border-gray-100 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow hover:bg-red-50"
                  title="Remove image"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
                <button
                  type="button"
                  onClick={() => featuredInputRef.current?.click()}
                  disabled={uploadingFeatured}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  {uploadingFeatured ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Upload className="h-3.5 w-3.5" />
                  )}
                  Replace image
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => featuredInputRef.current?.click()}
                disabled={uploadingFeatured}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 text-sm text-gray-500 transition-colors hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 disabled:opacity-50"
              >
                {uploadingFeatured ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6" />
                )}
                {uploadingFeatured ? "Uploading…" : "Click to upload featured image"}
                <span className="text-xs text-gray-400">JPG, PNG, WebP, GIF, AVIF</span>
              </button>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
