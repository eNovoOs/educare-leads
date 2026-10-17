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
  start_time_iso: "2026-10-20T14:00:00.000Z", start_date_text: "Tuesday, Oct 20", start_time_text: "10:00 AM EDT", start_datetime_crm: "10/20/2026 10:00 AM",
  timezone: "America/Toronto", join_url: "https://zoom/x", reschedule_url: "r", cancel_url: "c", event_name: "Strategy Call" });
// start_datetime_crm: EDT/EST, DST boundaries, noon/midnight, 12h padding
const crm = (iso) => m.formatCrmDatetime(new Date(iso));
assert.equal(crm("2026-10-20T14:30:00Z"), "10/20/2026 10:30 AM");
assert.equal(crm("2026-01-15T14:30:00Z"), "01/15/2026 09:30 AM"); // EST (UTC-5)
assert.equal(crm("2026-07-04T16:00:00Z"), "07/04/2026 12:00 PM"); // EDT noon
assert.equal(crm("2026-07-04T04:00:00Z"), "07/04/2026 12:00 AM"); // EDT midnight
assert.equal(crm("2026-03-08T06:59:00Z"), "03/08/2026 01:59 AM"); // before spring-forward (EST)
assert.equal(crm("2026-03-08T07:00:00Z"), "03/08/2026 03:00 AM"); // after (EDT)
assert.equal(crm("2026-11-01T05:30:00Z"), "11/01/2026 01:30 AM"); // EDT, before fall-back
assert.equal(crm("2026-11-01T06:30:00Z"), "11/01/2026 01:30 AM"); // EST, repeated hour
assert.equal(crm("2026-11-01T22:00:00Z"), "11/01/2026 05:00 PM");
assert.equal(m.formatCrmDatetime(new Date("bad")), "");
// CRM time is Toronto regardless of invitee timezone
assert.equal(m.buildBookingSmsPayload({ ...base, timezone: "Asia/Tokyo" }, base.scheduled_event.start_time).start_datetime_crm, "10/20/2026 10:00 AM");

// cancel payload
const canc = m.buildBookingCancelPayload({ ...base, name: "Jane Doe", first_name: "Jane", updated_at: "2026-10-16T12:00:00.000000Z" });
assert.deepEqual(canc, { event: "canceled", email: "a@b.com", phone: "+14388852056", first_name: "Jane", name: "Jane Doe",
  event_name: "Strategy Call", canceled_at: "2026-10-16T12:00:00.000Z" });
assert.equal(m.buildBookingCancelPayload({ ...base, cancellation: { created_at: "2026-10-17T01:02:03Z" }, updated_at: "2026-10-16T12:00:00Z" }).canceled_at, "2026-10-17T01:02:03.000Z");
assert.equal(m.buildBookingCancelPayload({ email: "x@y.com" }, new Date("2026-01-01T00:00:00Z")).canceled_at, "2026-01-01T00:00:00.000Z");
delete process.env.CRM_BOOKING_CANCEL_WEBHOOK_URL;
assert.equal(await m.sendBookingCancelWebhook(base), false); // unset -> silent no-op
console.log("booking-sms tests passed");
