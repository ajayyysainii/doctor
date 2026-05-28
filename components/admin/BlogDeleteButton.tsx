"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

export function BlogDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete blog.");
        return;
      }
      router.refresh();
    } catch {
      alert("Network error while deleting.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      Delete
    </button>
  );
}
