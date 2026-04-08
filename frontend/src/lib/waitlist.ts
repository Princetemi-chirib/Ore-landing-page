import { promises as fs } from "fs";
import path from "path";

export type WaitlistEntry = {
  email: string;
  whatsapp?: string;
  role?: string;
  goal?: string;
  capture?: string;
  firstFeature?: string;
  frequency?: string;
  country?: string;
  consent?: string;
  createdAt: string;
};

function dataDir() {
  return path.join(process.cwd(), "data");
}

function waitlistPath() {
  return path.join(dataDir(), "waitlist.jsonl");
}

export async function appendWaitlistEntry(entry: WaitlistEntry) {
  await fs.mkdir(dataDir(), { recursive: true });
  await fs.appendFile(waitlistPath(), `${JSON.stringify(entry)}\n`, "utf8");
}

