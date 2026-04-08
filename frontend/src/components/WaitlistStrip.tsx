"use client";

import { motion, useReducedMotion } from "framer-motion";

export function WaitlistStrip({
  countText = "3,217",
}: {
  countText?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <div className="text-sm text-white/70">
        Join{" "}
        <span
          className="bg-linear-to-r from-(--yello) via-(--cream) to-(--grape) bg-clip-text font-semibold text-transparent"
          style={
            reduced
              ? undefined
              : ({
                  backgroundSize: "200% 100%",
                } as React.CSSProperties)
          }
        >
          {countText}
        </span>{" "}
        others on the waitlist.
      </div>

      <motion.a
        href="/waitlist"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black px-6 text-[12px] font-medium text-(--cream) shadow-[0_18px_45px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
        whileHover={reduced ? undefined : { scale: 1.04, y: -1 }}
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        Join now
        <span aria-hidden className="text-(--cream)/90">
          ›
        </span>
      </motion.a>
    </div>
  );
}

