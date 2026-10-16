import { site } from "@/lib/site";

/** Escape user-controlled text for safe interpolation into HTML. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only allow http(s) URLs in hrefs; anything else becomes "#". */
export function safeUrl(url: string | undefined | null): string {
  if (!url) return "#";
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "#";
  } catch {
    return "#";
  }
}

/** Lead-facing sender. EMAIL_FROM wins; the sending domain is send.educareleads.com. */
export const LEAD_EMAIL_FROM =
  process.env.EMAIL_FROM || "Jessica at Educare Leads <jessica@send.educareleads.com>";
export const LEAD_EMAIL_REPLY_TO = site.email;
export const CALL_MINUTES = 20;

export type RenderedEmail = { subject: string; html: string; text: string };

export type Cta = { label: string; url: string };

/** Shared, table-free-but-inline-styled layout that works in major mail clients. */
export function layout(opts: {
  preheader: string;
  heading: string;
  paragraphs: string[]; // already-escaped HTML
  bullets?: { title?: string; items: string[] }; // already-escaped HTML
  cta?: Cta;
  secondary?: string; // already-escaped HTML
}): string {
  const p = opts.paragraphs
    .map((t) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:#1f2d3d">${t}</p>`)
    .join("");
  const bullets = opts.bullets
    ? `${opts.bullets.title ? `<p style="margin:18px 0 8px;font-size:15px;font-weight:700;color:#0b2447">${opts.bullets.title}</p>` : ""}<ul style="margin:0 0 18px;padding-left:20px;font-size:15px;line-height:1.6;color:#1f2d3d">${opts.bullets.items.map((i) => `<li style="margin-bottom:6px">${i}</li>`).join("")}</ul>`
    : "";
  const cta = opts.cta
    ? `<p style="margin:22px 0"><a href="${esc(safeUrl(opts.cta.url))}" style="display:inline-block;background:#0b2447;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:13px 24px;border-radius:8px">${esc(opts.cta.label)}</a></p>`
    : "";
  const secondary = opts.secondary
    ? `<p style="margin:0 0 14px;font-size:14px;line-height:1.55;color:#5b6b80">${opts.secondary}</p>`
    : "";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(opts.heading)}</title></head>
<body style="margin:0;padding:0;background:#f4f7fb">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</span>
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px 16px">
  <div style="background:#ffffff;border-radius:12px;padding:28px 26px">
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0b2447">${esc(opts.heading)}</h1>
    ${p}${bullets}${cta}${secondary}
    <p style="margin:18px 0 0;font-size:15px;line-height:1.55;color:#1f2d3d">Talk soon,<br>Jessica, Educare Leads</p>
  </div>
  <p style="margin:14px 8px 0;font-size:12px;line-height:1.5;color:#8392a5">
    Questions? Just reply to this email (it comes straight to me), write <a href="mailto:${esc(site.email)}" style="color:#8392a5">${esc(site.email)}</a> or call <a href="${esc(site.phoneHref)}" style="color:#8392a5">${esc(site.phone)}</a>.<br>
    You're receiving this because you requested a call with ${esc(site.name)}.
  </p>
</div></body></html>`;
}

/** Convert the same content to a plain-text email body. */
export function plain(opts: {
  heading: string;
  paragraphs: string[]; // raw text
  bullets?: { title?: string; items: string[] };
  links?: { label: string; url: string }[];
}): string {
  const out: string[] = [opts.heading, "", ...opts.paragraphs.flatMap((p) => [p, ""])];
  if (opts.bullets) {
    if (opts.bullets.title) out.push(opts.bullets.title);
    out.push(...opts.bullets.items.map((i) => `- ${i}`), "");
  }
  for (const l of opts.links ?? []) out.push(`${l.label}: ${l.url}`);
  out.push("", "Talk soon,", "Jessica, Educare Leads", "", `Questions? Just reply to this email (it comes straight to me), write ${site.email} or call ${site.phone}.`);
  return out.join("\n");
}

/** Format a start time in the invitee's timezone, e.g. "Tuesday, Oct 20 at 2:00 PM EDT". */
export function formatWhen(iso: string, timeZone?: string): string {
  const d = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  };
  try {
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: timeZone || "America/Toronto" }).format(d).replace(",", ",").replace(/, (\d)/, " at $1");
  } catch {
    return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(d);
  }
}
