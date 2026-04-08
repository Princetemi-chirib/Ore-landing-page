import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default:
      "Ọ̀rẹ́ — A Pal to Organize Your Mind and Protect Your Peace",
    template: "%s · Ọ̀rẹ́",
  },
  description:
    "Stop carrying your business alone. Ọ̀rẹ́ is a digital friend that listens to your thoughts and silently organizes your world. Clear the mental noise, find your focus, and wake up to a day already planned for you. Join the waitlist for a calmer, more organized way to live.",
  applicationName: "Ọ̀rẹ́",
  keywords: [
    "organize your mind",
    "mental clarity",
    "voice journaling",
    "daily planning",
    "second brain",
    "founders",
    "creatives",
    "peace of mind",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title:
      "Ọ̀rẹ́ — A Pal to Organize Your Mind and Protect Your Peace",
    description:
      "Stop carrying your business alone. Ọ̀rẹ́ is a digital friend that listens to your thoughts and silently organizes your world. Clear the mental noise, find your focus, and wake up to a day already planned for you. Join the waitlist for a calmer, more organized way to live.",
    siteName: "Ọ̀rẹ́",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ọ̀rẹ́ — A Pal to Organize Your Mind and Protect Your Peace",
    description:
      "Stop carrying your business alone. Ọ̀rẹ́ is a digital friend that listens to your thoughts and silently organizes your world. Clear the mental noise, find your focus, and wake up to a day already planned for you. Join the waitlist for a calmer, more organized way to live.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
