"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type Faq = {
  q: string;
  a: string;
  tone: "grape" | "yello" | "red" | "cream";
};

const faqs: Faq[] = [
  {
    q: "What is Ọ̀rẹ́, exactly?",
    a: "Ọ̀rẹ́ is a cognitive CRM: part journal, part calendar, part strategic partner. You can capture thoughts in text, decompress with voice, and turn real commitments into verified time blocks.",
    tone: "cream",
  },
  {
    q: "How is this different from a notes app or a normal calendar?",
    a: "Notes store raw text. Calendars store events. Ọ̀rẹ́ connects the two: it parses intent, asks for verification before scheduling, and uses your context to send pre‑game and post‑game prompts that actually move work forward.",
    tone: "yello",
  },
  {
    q: "Does Ọ̀rẹ́ schedule things automatically?",
    a: "Only after you confirm. If you say “I’ll do it tomorrow at 9,” Ọ̀rẹ́ will ask: “Should I officially block that time?” Nothing gets committed without your approval.",
    tone: "red",
  },
  {
    q: "How does the “DNA onboarding” work?",
    a: "You share a website URL and social handles. Ọ̀rẹ́ extracts your value props, current projects, and voice/aesthetic so future sessions don’t start with “Who are you?” It becomes a reusable profile the assistant references.",
    tone: "grape",
  },
  {
    q: "Is my journal private?",
    a: "Yes—privacy is a first-class requirement. The goal is to support zero-knowledge encryption for journal entries and strong PII scrubbing for any non-private context. You’ll also be able to mark nodes as local-only for extra sensitive content.",
    tone: "cream",
  },
  {
    q: "What’s included in the beta?",
    a: "The nightly handover flow: daily thread capture → voice decompression → intent parsing → verification gate → shadow calendar updates, plus lightweight contextual prompts.",
    tone: "yello",
  },
  {
    q: "When will I get access?",
    a: "We’re onboarding a small group in waves. Join the waitlist and you’ll get an invite when your cohort opens.",
    tone: "cream",
  },
];

function toneAccent(tone: Faq["tone"]) {
  switch (tone) {
    case "grape":
      return {
        dot: "bg-(--grape)",
        glow: "rgba(124,58,237,0.20)",
      };
    case "yello":
      return {
        dot: "bg-(--yello)",
        glow: "rgba(251,191,36,0.18)",
      };
    case "red":
      return {
        dot: "bg-(--red)",
        glow: "rgba(239,68,68,0.14)",
      };
    case "cream":
      return {
        dot: "bg-(--cream)",
        glow: "rgba(245,241,230,0.10)",
      };
  }
}

export function FaqSection() {
  const reduced = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number>(0);

  const rows = useMemo(() => faqs, []);

  return (
    <section id="faqs" className="mt-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="relative min-h-svh overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/25 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur md:min-h-0 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[92%] max-w-6xl rounded-[999px] blur-3xl opacity-70"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,191,36,0.20) 0%, rgba(245,241,230,0.12) 40%, rgba(124,58,237,0.22) 70%, rgba(239,68,68,0.12) 100%)",
            }}
          />

          <div className="relative grid h-full gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <div className="text-xs font-semibold tracking-wide text-white/65">
                FAQs
              </div>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-(--cream) md:text-4xl">
                Questions, answered.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                If you’re wondering how the system works, what gets automated,
                and how privacy is handled—start here.
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="grid gap-3 md:max-h-none md:overflow-visible max-h-[calc(100svh-18rem)] overflow-auto pr-1">
                {rows.map((f, idx) => {
                  const isOpen = idx === openIdx;
                  const t = toneAccent(f.tone);
                  return (
                    <div
                      key={f.q}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.05)] shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ background: t.glow }}
                      />

                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                        className="relative flex w-full items-center justify-between gap-4 p-5 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                          <span className="text-sm font-semibold text-(--cream)">
                            {f.q}
                          </span>
                        </div>
                        <motion.span
                          aria-hidden
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-(--cream)"
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="relative overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-sm leading-6 text-white/75">
                              {f.a}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

