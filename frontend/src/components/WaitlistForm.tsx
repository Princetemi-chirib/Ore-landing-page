"use client";

import { useMemo, useState } from "react";

type Role = "founder" | "creative" | "high-performer" | "other";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("founder");
  const [useCase, setUseCase] = useState("");

  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const canSubmit = useMemo(() => {
    if (status.state === "submitting") return false;
    return email.trim().length > 3;
  }, [email, status.state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          useCase,
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({
          state: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({ state: "success" });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl border border-black/10 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@domain.com"
            className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-black/20 dark:placeholder:text-zinc-500 dark:focus:border-white/20 dark:focus:ring-white/10"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Name (optional)
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="name"
            placeholder="Adeni"
            className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-black/20 dark:placeholder:text-zinc-500 dark:focus:border-white/20 dark:focus:ring-white/10"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            You are
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-0 focus:border-black/20 focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-black/20 dark:focus:border-white/20 dark:focus:ring-white/10"
          >
            <option value="founder">Founder / OBO</option>
            <option value="creative">Creative</option>
            <option value="high-performer">High-performer</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Primary goal (optional)
          </span>
          <input
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            type="text"
            placeholder="Clear my head nightly and wake up with a plan."
            className="h-11 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 dark:border-white/10 dark:bg-black/20 dark:placeholder:text-zinc-500 dark:focus:border-white/20 dark:focus:ring-white/10"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
        >
          {status.state === "submitting" ? "Joining..." : "Join the waitlist"}
        </button>

        <div className="min-h-5 text-sm">
          {status.state === "success" ? (
            <span className="text-emerald-700 dark:text-emerald-400">
              You’re in. We’ll email you when it’s ready.
            </span>
          ) : status.state === "error" ? (
            <span className="text-red-700 dark:text-red-400">
              {status.message}
            </span>
          ) : (
            <span className="text-zinc-600 dark:text-zinc-400">
              No spam. Early access invites only.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

