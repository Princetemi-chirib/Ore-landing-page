"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#how-it-works" },
  { label: "FAQs", href: "#faqs" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto w-full max-w-6xl px-4 pb-3 pt-6 sm:px-6 md:pb-4 md:pt-8">
        <div className="relative">
          {/* Soft ambient wash behind the pill */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-6 mx-auto h-20 w-[94%] max-w-296 rounded-[999px] blur-2xl opacity-70"
            style={{
              background:
                "linear-gradient(90deg, rgba(248,231,210,0.75) 0%, rgba(236,245,255,0.75) 40%, rgba(228,238,255,0.72) 60%, rgba(210,239,230,0.72) 100%)",
            }}
          />

          <div className="mx-auto flex w-full max-w-296 items-center justify-between rounded-[999px] border border-black/10 bg-[rgba(255,253,208,0.72)] px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-md md:px-6">
            <a href="#" className="flex items-center pl-0.5">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-transparent">
                <Image
                  src="/images/logo 3.png"
                  alt="Ọ̀rẹ́"
                  fill
                  sizes="56px"
                  className="object-contain"
                  priority
                />
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-[13px] font-medium text-black/70 md:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-black"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 pr-1">
              <a
                href="/waitlist?mode=login"
                className="hidden h-9 items-center rounded-full border border-black/10 bg-white/70 px-4 text-[12px] font-medium text-black shadow-sm backdrop-blur transition hover:bg-white md:inline-flex"
              >
                Login
              </a>
              <motion.a
                href="/waitlist"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-black px-4 text-[12px] font-medium text-white shadow-sm transition hover:bg-black/90"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <span aria-hidden className="text-white/90">
                  ›
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

