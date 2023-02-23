import { Metadata } from "next";
import "./globals.css";

const title = "Repurpose Tweet";
const description =
  "Effortlessly generate fresh Twitter content with Tweet Repurpose that repurposes your old tweets.";
const image =
  "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/ogp";
const url = "https://repurpose-tweet.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  viewport: "width=device-width, initial-scale=1",
  authors: [
    { name: "Taishi" },
    { name: "Taishi", url: "https://twitter.com/taishik_" },
  ],
  publisher: "Taishi",
  alternates: {
    canonical: url,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: "website",
    locale: "en_US",
    images: image,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@taishik_",
    images: [image],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
