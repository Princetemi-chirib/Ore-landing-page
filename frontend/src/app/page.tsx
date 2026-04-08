import { Header } from "@/components/Header";
import { AppMockup } from "@/components/AppMockup";
import { AuroraBackground } from "@/components/motion/AuroraBackground";
import { PillarCards } from "@/components/PillarCards";
import { WaitlistStrip } from "@/components/WaitlistStrip";
import { FourWaysSection } from "@/components/FourWaysSection";
import { ScrollStorySection } from "@/components/ScrollStorySection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-(--cream)">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 md:pt-28">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur md:px-10 md:py-14">
          <AuroraBackground className="absolute inset-0 -z-10" />

          <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 shadow-sm backdrop-blur">
              Voice + context + calendar → structured action
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-(--cream) md:text-6xl">
              One brain,
              <br className="hidden sm:block" /> every thought.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-white/75">
              Capture ideas in text or voice. Ọ̀rẹ́ learns your context and turns
              nightly decompression into a verified plan on your shadow calendar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/waitlist"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-(--cream) px-5 text-sm font-medium text-black shadow-sm ring-1 ring-white/10 hover:bg-white"
              >
                Get early access
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 text-sm font-medium text-(--cream) hover:bg-white/10"
              >
                See how it works
              </a>
            </div>

            <WaitlistStrip />

            <PillarCards />
          </div>

          <div className="md:col-span-5">
            <AppMockup className="mx-auto max-w-md" />
          </div>
          </div>
        </section>

        <FourWaysSection />

        <ScrollStorySection />

        <section
          id="how-it-works"
          className="mt-20 scroll-mt-24 overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/25 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-64 w-[92%] max-w-6xl rounded-[999px] blur-3xl opacity-70"
            style={{
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.25) 0%, rgba(251,191,36,0.20) 45%, rgba(239,68,68,0.14) 100%)",
            }}
          />
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-(--cream)">
                Built around 3 pillars
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/75">
                The foundation for a “Chief of Staff / Creative Producer” that
                keeps context, protects focus, and turns journaling into action.
              </p>
              <div className="mt-6 grid gap-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--grape)" />
                  <span>Context that persists across months</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--yello)" />
                  <span>Capture that doesn’t break flow</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--red)" />
                  <span>Commitments that become time blocks</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "DNA onboarding",
                  bullets: [
                    "Website + socials crawl",
                    "Founder voice + aesthetic",
                    "Stored as a reusable profile",
                  ],
                  tone: "grape",
                },
                {
                  title: "Hybrid interaction",
                  bullets: [
                    "Minimal voice space",
                    "WhatsApp-style async thread",
                    "Daily summary → evening prompt",
                  ],
                  tone: "yello",
                },
                {
                  title: "Shadow calendar",
                  bullets: [
                    "Visual timeline calendar",
                    "Verification requests",
                    "Contextual alerts + follow-ups",
                  ],
                  tone: "red",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        card.tone === "grape"
                          ? "rgba(124,58,237,0.22)"
                          : card.tone === "yello"
                            ? "rgba(251,191,36,0.20)"
                            : "rgba(239,68,68,0.14)",
                    }}
                  />

                  <div className="relative flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        card.tone === "grape"
                          ? "bg-(--grape)"
                          : card.tone === "yello"
                            ? "bg-(--yello)"
                            : "bg-(--red)"
                      }`}
                    />
                    <div className="text-sm font-semibold text-(--cream)">
                      {card.title}
                    </div>
                  </div>
                  <ul className="relative mt-4 grid gap-2 text-sm text-white/75">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-white/35" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-5 h-px w-full bg-linear-to-r from-white/0 via-white/12 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-(--cream)">
              The “perfect day”
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              A lightweight cadence that clears the mental cache and keeps you
              moving without adding overhead.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="text-xs font-semibold text-white/80">Why it works</div>
              <div className="mt-2 grid gap-2 text-sm text-white/75">
                <div className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--yello)" />
                  <span>Capture during the day without switching contexts.</span>
                </div>
                <div className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--grape)" />
                  <span>Voice at night turns emotion into clarity.</span>
                </div>
                <div className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--red)" />
                  <span>Verification converts intention into scheduling.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 grid gap-3">
            {[
              {
                time: "08:00",
                title: "Morning Mirror",
                desc: "A greeting that surfaces yesterday’s Priority #1.",
                tone: "yello",
              },
              {
                time: "14:00",
                title: "Quick Capture",
                desc: "Text: “new content idea” → logged into Creative Fragments.",
                tone: "grape",
              },
              {
                time: "18:00",
                title: "Live Decompression",
                desc: "A short walk + voice → 3 tasks for tomorrow.",
                tone: "yello",
              },
              {
                time: "18:15",
                title: "The Handover",
                desc: "Commitments verified and scheduled. Night is yours.",
                tone: "red",
              },
            ].map((row) => (
              <div
                key={row.time}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      row.tone === "grape"
                        ? "rgba(124,58,237,0.20)"
                        : row.tone === "yello"
                          ? "rgba(251,191,36,0.18)"
                          : "rgba(239,68,68,0.14)",
                  }}
                />
                <div className="flex items-baseline justify-between gap-4">
                  <div className="relative flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        row.tone === "grape"
                          ? "bg-(--grape)"
                          : row.tone === "yello"
                            ? "bg-(--yello)"
                            : "bg-(--red)"
                      }`}
                    />
                    <div className="text-sm font-semibold text-(--cream)">
                      {row.title}
                    </div>
                  </div>
                  <div className="relative text-xs text-white/55">{row.time}</div>
                </div>
                <div className="relative mt-2 text-sm leading-6 text-white/75">
                  {row.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div id="waitlist" className="scroll-mt-24" />

        <FaqSection />

        <Footer />
      </main>
    </div>
  );
}
