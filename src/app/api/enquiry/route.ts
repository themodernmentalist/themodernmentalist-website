import { NextResponse } from "next/server";
import { BUDGETS, EVENT_TYPES, HEARD_FROM, type EnquiryPayload } from "@/lib/enquiry";
import { submitToSeventeenHats } from "@/lib/seventeenHats";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled, or submitted impossibly fast: pretend it worked.
  if (clean(body.company, 200) || Number(body.elapsed) < 2500) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries, please try again shortly." },
      { status: 429 },
    );
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const eventType = clean(body.eventType, 40);
  const phone = clean(body.phone, 40);
  const date = clean(body.date, 40);
  const location = clean(body.location, 200);
  const budget = clean(body.budget, 40);
  const heardFrom = clean(body.heardFrom, 60);
  const message = clean(body.message, 4000);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !(EVENT_TYPES as readonly string[]).includes(eventType) || !phone || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !location || !(BUDGETS as readonly string[]).includes(budget) || !message) {
    return NextResponse.json({ error: "Please check the highlighted fields." }, { status: 400 });
  }
  if (!(HEARD_FROM as readonly string[]).includes(heardFrom)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Event type", eventType],
    ["Event date", date || "Not specified"],
    ["Location", location],
    ["Budget", budget],
    ["Heard about Edwin via", heardFrom || "Not specified"],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    message || "(none)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#12201a;max-width:560px">
      <h2 style="margin:0 0 16px">New enquiry from ${esc(name)}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#5c5443;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 4px;color:#5c5443">Message</p>
      <p style="margin:0;white-space:pre-wrap">${esc(message || "(none)")}</p>
      <p style="margin:24px 0 0;color:#5c5443;font-size:12px">Hit reply to respond directly to ${esc(name)}.</p>
    </div>`;

  const payload: EnquiryPayload = {
    name,
    email,
    eventType,
    phone,
    date,
    location,
    budget,
    heardFrom,
    message,
    company: "",
    elapsed: 0,
  };

  const [emailResult, crmResult] = await Promise.allSettled([
    sendEmail({ name, email, eventType, date, location, text, html }),
    // Local testing never creates real leads unless SEVENTEEN_HATS_ENABLED=true.
    process.env.NODE_ENV === "production" || process.env.SEVENTEEN_HATS_ENABLED === "true"
      ? submitToSeventeenHats(payload)
      : Promise.resolve(),
  ]);

  if (emailResult.status === "rejected") {
    console.error("[enquiry] email failed:", emailResult.reason);
  }
  if (crmResult.status === "rejected") {
    console.error("[enquiry] 17hats failed:", crmResult.reason);
  }

  // The visitor sees success if the enquiry reached Edwin by at least one route.
  if (emailResult.status === "rejected" && crmResult.status === "rejected") {
    return NextResponse.json({ error: "Couldn't send, please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

async function sendEmail(args: {
  name: string;
  email: string;
  eventType: string;
  date: string;
  location: string;
  text: string;
  html: string;
}) {
  const { name, email, eventType, date, location, text, html } = args;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[enquiry] Email not configured; would have sent:\n" + text);
      return;
    }
    throw new Error("Missing RESEND_API_KEY / ENQUIRY_TO_EMAIL / ENQUIRY_FROM_EMAIL");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: email,
      subject: `New ${eventType.toLowerCase()} enquiry: ${name} — ${date}, ${location}`,
      text,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
