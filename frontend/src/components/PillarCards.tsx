"use client";

import { motion, useReducedMotion } from "framer-motion";

const pillars = [
  {
    title: "Deep context",
    desc: "Onboarding that learns your voice, projects, and goals.",
    tone: "grape",
  },
  {
    title: "Hybrid capture",
    desc: "Text threads + low-latency voice for real decompression.",
    tone: "yello",
  },
  {
    title: "Shadow calendar",
    desc: "Turns intentions into verified, scheduled commitments.",
    tone: "red",
  },
] as const;

function toneStyles(tone: (typeof pillars)[number]["tone"]) {
  switch (tone) {
    case "grape":
      return {
        outer:
          "bg-linear-to-b from-[rgba(124,58,237,0.45)] via-[rgba(124,58,237,0.10)] to-[rgba(255,255,255,0.06)]",
        dot: "bg-(--grape)",
      };
    case "yello":
      return {
        outer:
          "bg-linear-to-b from-[rgba(251,191,36,0.40)] via-[rgba(251,191,36,0.10)] to-[rgba(255,255,255,0.06)]",
        dot: "bg-(--yello)",
      };
    case "red":
      return {
        outer:
          "bg-linear-to-b from-[rgba(239,68,68,0.30)] via-[rgba(239,68,68,0.10)] to-[rgba(255,255,255,0.06)]",
        dot: "bg-(--red)",
      };
  }
}

export function PillarCards() {
  const reduced = useReducedMotion();

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {pillars.map((p) => {
        const t = toneStyles(p.tone);
        return (
          <motion.div
            key={p.title}
            className={`rounded-2xl p-px ${t.outer}`}
            whileHover={reduced ? undefined : { y: -6 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <div className="group rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-4 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                <div className="text-sm font-semibold text-(--cream)">{p.title}</div>
              </div>
              <div className="mt-2 text-sm leading-6 text-white/75">{p.desc}</div>
              <div className="mt-3 h-px w-full bg-linear-to-r from-white/0 via-white/12 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

