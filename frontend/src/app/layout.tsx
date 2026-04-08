import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ọ̀rẹ́ — The Cognitive CRM",
  description:
    "A high-utility second brain for founders and creatives: voice + context + an autonomous calendar that turns daily chaos into structured action.",
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
