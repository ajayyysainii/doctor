import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drsureshpalsania.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Suresh Palsania — Orthopedic Surgeon, Sikar Rajasthan",
    template: "%s | Dr. Suresh Palsania",
  },
  description:
    "Expert orthopedic and joint replacement care in Sikar, Rajasthan. Dr. Suresh Palsania offers knee replacement, hip replacement, spine surgery, sports medicine, and trauma care.",
  keywords: [
    "orthopedic surgeon Sikar",
    "joint replacement Sikar",
    "knee replacement Rajasthan",
    "hip replacement surgeon",
    "Dr. Suresh Palsania",
    "bone doctor Sikar",
    "orthopedic hospital Sikar",
    "trauma surgery Rajasthan",
    "sports medicine Sikar",
  ],
  authors: [{ name: "Dr. Suresh Palsania", url: SITE_URL }],
  creator: "Dr. Suresh Palsania",
  publisher: "Dr. Suresh Palsania",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dr. Suresh Palsania",
    title: "Dr. Suresh Palsania — Orthopedic Surgeon, Sikar Rajasthan",
    description:
      "Expert orthopedic and joint replacement care in Sikar, Rajasthan. Knee, hip, spine, sports medicine and trauma surgery.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dr. Suresh Palsania Clinic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Suresh Palsania — Orthopedic Surgeon, Sikar Rajasthan",
    description: "Expert orthopedic and joint replacement care in Sikar, Rajasthan.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
