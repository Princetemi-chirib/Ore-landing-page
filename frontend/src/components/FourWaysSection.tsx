"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  {
    tone: "yello",
    title: "Interruptible voice that clears your head",
    desc: "Talk on a walk. Ọ̀rẹ́ listens in real time, challenges one sticky thought, and hands you tomorrow’s top 3.",
    tag: "Realtime",
    featured: true,
  },
  {
    tone: "grape",
    title: "DNA onboarding that remembers your context",
    desc: "Drop your website + socials. Ọ̀rẹ́ learns your voice, projects, and priorities so you stop repeating yourself.",
    tag: "Context",
  },
  {
    tone: "red",
    title: "Verification gate → commitments that happen",
    desc: "When you say “tomorrow at 9,” Ọ̀rẹ́ confirms, blocks the time, and runs a pre‑game + post‑game loop.",
    tag: "Calendar",
  },
  {
    tone: "cream",
    title: "A shadow calendar + task log for your life",
    desc: "Not just notes—an actionable timeline. Reflections stay private; commitments become scheduled blocks with context attached.",
    tag: "Timeline",
  },
] as const;

function toneAccent(tone: (typeof items)[number]["tone"]) {
  switch (tone) {
    case "yello":
      return {
        ring: "ring-[rgba(251,191,36,0.25)]",
        glow: "rgba(251,191,36,0.22)",
        dot: "bg-(--yello)",
        tag: "bg-[rgba(251,191,36,0.14)] text-(--yello)",
      };
    case "grape":
      return {
        ring: "ring-[rgba(124,58,237,0.23)]",
        glow: "rgba(124,58,237,0.20)",
        dot: "bg-(--grape)",
        tag: "bg-[rgba(124,58,237,0.14)] text-(--grape)",
      };
    case "red":
      return {
        ring: "ring-[rgba(239,68,68,0.20)]",
        glow: "rgba(239,68,68,0.16)",
        dot: "bg-(--red)",
        tag: "bg-[rgba(239,68,68,0.14)] text-(--red)",
      };
    case "cream":
      return {
        ring: "ring-white/10",
        glow: "rgba(245,241,230,0.12)",
        dot: "bg-(--cream)",
        tag: "bg-white/10 text-(--cream)",
      };
  }
}

export function FourWaysSection() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="mt-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-(--cream) md:text-4xl">
            Four ways Ọ̀rẹ́ turns daily chaos into structured action
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-6 text-white/75">
            Built for founders and creatives who want a calm system: capture,
            decompress, verify commitments, and wake up with a plan.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-12">
          {items.map((it, idx) => {
            const a = toneAccent(it.tone);
            const isFeatured = "featured" in it && it.featured === true;
            const col = isFeatured ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={it.title}
                className={`${col}`}
                initial={reduced ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.04 }}
              >
                <motion.div
                  className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur ring-1 ${a.ring}`}
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                    style={{ background: a.glow, opacity: 0.9 }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${a.tag}`}
                      >
                        {it.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/45">
                      {isFeatured ? "Pillar" : "Feature"}
                    </span>
                  </div>

                  <div className="relative mt-4">
                    <div className="text-lg font-semibold text-(--cream)">
                      {it.title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-white/75">
                      {it.desc}
                    </div>
                  </div>

                  {isFeatured ? (
                    <div className="relative mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="text-xs font-semibold text-white/80">
                        In practice
                      </div>
                      <div className="mt-2 grid gap-2 text-sm text-white/75">
                        <div className="flex gap-2">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--yello)" />
                          <span>“Today in 40 seconds” opens your evening voice.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--grape)" />
                          <span>One challenge + 3 commitments for tomorrow.</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--red)" />
                          <span>Commitments verified and scheduled.</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <MiniVisual tone={it.tone} reduced={reduced} />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MiniVisual({
  tone,
  reduced,
}: {
  tone: (typeof items)[number]["tone"];
  reduced: boolean;
}) {
  if (tone === "grape") {
    return (
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-white/80">DNA profile</div>
          <span className="text-[11px] text-white/50">Crawling…</span>
        </div>
        <div className="mt-3 grid gap-2">
          {["Website", "LinkedIn", "X / Portfolio"].map((t) => (
            <div
              key={t}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <span className="text-xs text-white/75">{t}</span>
              <span className="text-[11px] text-white/45">Queued</span>
            </div>
          ))}
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-(--grape) via-(--cream) to-(--grape)"
          animate={reduced ? undefined : { x: ["-30%", "30%", "-30%"] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ opacity: 0.7 }}
        />
      </div>
    );
  }

  if (tone === "red") {
    return (
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="text-xs font-semibold text-white/80">Verification gate</div>
        <div className="mt-3 grid gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/75">
            “Deck work” at <span className="text-(--cream)">9:00 AM</span> — block it?
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-xl bg-(--cream) text-xs font-medium text-black grid place-items-center">
              Yes
            </div>
            <div className="h-9 rounded-xl border border-white/12 bg-white/5 text-xs font-medium text-(--cream) grid place-items-center">
              Not yet
            </div>
          </div>
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(239,68,68,0.22)", opacity: 0.55 }}
          animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.45, 0.6, 0.45] }}
          transition={
            reduced
              ? undefined
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>
    );
  }

  // cream timeline
  return (
    <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-white/80">Tomorrow</div>
        <span className="text-[11px] text-white/50">Timeline</span>
      </div>
      <div className="mt-3 grid gap-2">
        {[
          { time: "09:00", tone: "yello" as const, label: "Deck work" },
          { time: "11:00", tone: "grape" as const, label: "Follow‑ups" },
          { time: "16:30", tone: "red" as const, label: "Flow block" },
        ].map((r) => (
          <div
            key={r.time}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  r.tone === "yello"
                    ? "bg-(--yello)"
                    : r.tone === "grape"
                      ? "bg-(--grape)"
                      : "bg-(--red)"
                }`}
              />
              <span className="text-xs text-white/75">{r.label}</span>
            </div>
            <span className="text-[11px] text-white/50">{r.time}</span>
          </div>
        ))}
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 h-px bg-linear-to-r from-white/0 via-white/18 to-white/0"
        animate={reduced ? undefined : { opacity: [0.25, 0.6, 0.25] }}
        transition={
          reduced ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}

