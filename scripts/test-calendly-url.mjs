// Run: node scripts/test-calendly-url.mjs  (transpiles src/lib/calendly.ts + bookingSms.ts with typescript)
import ts from "typescript";
import fs from "node:fs";
import assert from "node:assert/strict";
const tr = (f) => ts.transpileModule(fs.readFileSync(new URL(f, import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const dataUrl = (js) => "data:text/javascript;base64," + Buffer.from(js).toString("base64");
const sms = dataUrl(tr("../src/lib/bookingSms.ts"));
const site = dataUrl('export const site = { calendlyUrl: "https://calendly.com/educareleads-info/60min" };');
const js = tr("../src/lib/calendly.ts").replace('"@/lib/site"', JSON.stringify(site)).replace('"@/lib/bookingSms"', JSON.stringify(sms));
const m = await import(dataUrl(js));

delete process.env.CALENDLY_PHONE_PARAM;
const u = (phone) => new URL(m.buildCalendlyUrl({ name: "T", email: "a@b.com", phone }));
for (const p of ["4388852056", "(438) 885-2056", "+1 438-885-2056", "1-438-885-2056"]) {
  const url = u(p);
  assert.equal(url.searchParams.get("a2"), "+14388852056", p);
  assert.equal(url.searchParams.get("a1"), null, "a1 (notes) must stay empty");
  assert.ok(url.search.includes("a2=%2B14388852056"), "phone must be URL-encoded");
}
assert.equal(u("").searchParams.get("a2"), null);
assert.equal(u("123").searchParams.get("a2"), null);
assert.equal(u("+44 20 7946 0958").searchParams.get("a2"), "+442079460958");
assert.equal(u("4388852056").searchParams.get("name"), "T");
assert.equal(u("4388852056").searchParams.get("email"), "a@b.com");
process.env.CALENDLY_PHONE_PARAM = "";
assert.equal(u("4388852056").searchParams.get("a2"), null);
console.log("calendly-url tests passed");
