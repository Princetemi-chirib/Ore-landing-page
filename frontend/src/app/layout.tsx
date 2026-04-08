import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Ọ̀rẹ́ — The Cognitive CRM",
    template: "%s · Ọ̀rẹ́",
  },
  description:
    "A high-utility second brain for founders and creatives: voice + context + an autonomous calendar that turns daily chaos into structured action.",
  applicationName: "Ọ̀rẹ́",
  keywords: [
    "cognitive crm",
    "second brain",
    "voice journaling",
    "daily planning",
    "founders",
    "creatives",
    "shadow calendar",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Ọ̀rẹ́ — The Cognitive CRM",
    description:
      "Voice + context + calendar → structured action. Capture, decompress, verify, and wake up with a plan.",
    siteName: "Ọ̀rẹ́",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ọ̀rẹ́ — The Cognitive CRM",
    description:
      "Voice + context + calendar → structured action. Capture, decompress, verify, and wake up with a plan.",
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
