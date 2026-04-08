"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  key: string;
  color: string;
  size: number;
  left: string;
  top: string;
  opacity: number;
  blur: string;
  duration: number;
  delay: number;
};

const blobs: Blob[] = [
  {
    key: "grape-1",
    color: "rgba(124, 58, 237, 0.40)",
    size: 720,
    left: "-18%",
    top: "-22%",
    opacity: 0.55,
    blur: "blur-3xl",
    duration: 18,
    delay: 0,
  },
  {
    key: "yello-1",
    color: "rgba(251, 191, 36, 0.32)",
    size: 720,
    left: "55%",
    top: "-28%",
    opacity: 0.45,
    blur: "blur-3xl",
    duration: 20,
    delay: 0.4,
  },
  {
    key: "red-1",
    color: "rgba(239, 68, 68, 0.22)",
    size: 760,
    left: "34%",
    top: "52%",
    opacity: 0.30,
    blur: "blur-3xl",
    duration: 22,
    delay: 0.8,
  },
];

export function AuroraBackground({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={className}>
      {blobs.map((b) => (
        <motion.div
          key={b.key}
          className={`absolute rounded-full ${b.blur}`}
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: b.color,
            opacity: b.opacity,
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 18, 0, -14, 0],
                  y: [0, -14, 0, 16, 0],
                  scale: [1, 1.04, 1, 0.98, 1],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: b.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: b.delay,
                }
          }
        />
      ))}

      {/* Grid / lines (like reference) */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.75) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.75) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      {/* Colored filled squares */}
      <motion.div
        className="absolute left-[8%] top-[18%] h-10 w-10 rounded-lg bg-[rgba(124,58,237,0.22)]"
        animate={reduced ? undefined : { opacity: [0.35, 0.7, 0.35] }}
        transition={
          reduced ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <motion.div
        className="absolute left-[16%] top-[58%] h-8 w-8 rounded-lg bg-[rgba(251,191,36,0.20)]"
        animate={reduced ? undefined : { opacity: [0.25, 0.6, 0.25] }}
        transition={
          reduced ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <motion.div
        className="absolute right-[18%] top-[22%] h-9 w-9 rounded-lg bg-[rgba(239,68,68,0.16)]"
        animate={reduced ? undefined : { opacity: [0.2, 0.55, 0.2] }}
        transition={
          reduced ? undefined : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <div
        className="absolute right-[10%] top-[62%] h-12 w-12 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,241,230,0.18), rgba(245,241,230,0.06))",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
        }}
      />

      {/* Soft vignette + readable overlay */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_top] from-white/10 via-black/35 to-black" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

