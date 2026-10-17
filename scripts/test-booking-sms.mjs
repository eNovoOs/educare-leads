// Run: node scripts/test-booking-sms.mjs  (transpiles src/lib/bookingSms.ts with typescript)
import ts from "typescript";
import fs from "node:fs";
import assert from "node:assert/strict";
const src = fs.readFileSync(new URL("../src/lib/bookingSms.ts", import.meta.url), "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const m = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

for (const n of ["+1 438-885-2056", "4388852056", "(438) 885-2056", "1-438-885-2056", "+14388852056"])
  assert.equal(m.normalizePhone(n), "+14388852056", n);
assert.equal(m.normalizePhone("+44 20 7946 0958"), "+442079460958");
assert.equal(m.normalizePhone("123"), "");
assert.equal(m.normalizePhone(null), "");

const base = { email: "a@b.com", name: "Jane Q Doe", first_name: null, last_name: null, timezone: "America/Toronto",
  cancel_url: "c", reschedule_url: "r",
  questions_and_answers: [{ question: "Mobile phone number", answer: "4388852056" }],
  scheduled_event: { name: "Strategy Call", start_time: "2026-10-20T14:00:00.000000Z", location: { join_url: "https://zoom/x" } } };
assert.equal(m.getFirstName(base), "Jane");
assert.equal(m.getInviteePhone(base), "4388852056");
assert.equal(m.getInviteePhone({ ...base, text_reminder_number: "+1 514 555 0000" }), "+1 514 555 0000");
const out = m.buildBookingSmsPayload(base, base.scheduled_event.start_time);
assert.deepEqual(out, { first_name: "Jane", last_name: "Q Doe", name: "Jane Q Doe", email: "a@b.com", phone: "+14388852056",
  start_time_iso: "2026-10-20T14:00:00.000Z", start_date_text: "Tuesday, Oct 20", start_time_text: "10:00 AM EDT",
  timezone: "America/Toronto", join_url: "https://zoom/x", reschedule_url: "r", cancel_url: "c", event_name: "Strategy Call" });
console.log("booking-sms tests passed");
