import { revalidatePath } from "next/cache";

export function revalidateBlogPages(slug?: string) {
  revalidatePath("/patient-education");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/patient-education/${slug}`);
  }
}
