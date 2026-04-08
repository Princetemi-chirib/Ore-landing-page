import { NextResponse } from "next/server";
import { appendWaitlistEntry } from "@/lib/waitlist";
import { sendWaitlistNotification } from "@/lib/email";

export const runtime = "nodejs";

function isEmail(value: string) {
  // pragmatic validation for a waitlist; avoids rejecting valid-but-rare emails
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function looksLikePhone(value: string) {
  const v = value.trim();
  const digits = (v.match(/\d/g) ?? []).length;
  return digits >= 8 && /^[+\d\s().-]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      whatsapp?: string;
      role?: string;
      goals?: string[] | string;
      capture?: string;
      firstFeature?: string;
      frequency?: string;
      country?: string;
      consent?: string;
    };

    const email = (body.email ?? "").trim().toLowerCase();
    if (!email || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    const whatsapp = (body.whatsapp ?? "").trim();
    if (!whatsapp || !looksLikePhone(whatsapp)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid WhatsApp number." },
        { status: 400 },
      );
    }

    const entry = {
      email,
      whatsapp,
      role: body.role?.trim() || undefined,
      goal:
        typeof body.goals === "string"
          ? body.goals.trim() || undefined
          : Array.isArray(body.goals)
            ? body.goals.map((x) => String(x).trim()).filter(Boolean).join(", ")
            : undefined,
      capture: body.capture?.trim() || undefined,
      firstFeature: body.firstFeature?.trim() || undefined,
      frequency: body.frequency?.trim() || undefined,
      country: body.country?.trim() || undefined,
      consent: body.consent?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    await appendWaitlistEntry(entry);
    try {
      await sendWaitlistNotification(entry);
    } catch {
      // Email is best-effort; still keep the waitlist submission.
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

