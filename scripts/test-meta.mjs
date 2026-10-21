// Run: node scripts/test-meta.mjs  (transpiles src/lib/meta.ts + bookingSms.ts with typescript)
import ts from "typescript";
import fs from "node:fs";
import crypto from "node:crypto";
import assert from "node:assert/strict";
const tr = (f) => ts.transpileModule(fs.readFileSync(new URL(f, import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const dataUrl = (js) => "data:text/javascript;base64," + Buffer.from(js).toString("base64");
const sms = dataUrl(tr("../src/lib/bookingSms.ts"));
const m = await import(dataUrl(tr("../src/lib/meta.ts").replace('"@/lib/bookingSms"', JSON.stringify(sms))));
const cfg = await import(dataUrl(tr("../src/lib/metaConfig.ts")));
const h = (s) => crypto.createHash("sha256").update(s).digest("hex");

assert.equal(m.phoneForMeta("(438) 885-2056"), "14388852056");
assert.equal(m.phoneForMeta("+44 20 7946 0958"), "442079460958");
assert.equal(m.phoneForMeta("123"), "");
const u = m.buildUserData({ email: " A@B.com ", phone: "438-885-2056", firstName: "Ann", lastName: "Lee", fbc: "fb.1.1.x", ip: "1.2.3.4", ua: "UA" });
assert.deepEqual(u.em, [h("a@b.com")]);
assert.deepEqual(u.external_id, [h("a@b.com")]);
assert.deepEqual(u.ph, [h("14388852056")]);
assert.deepEqual(u.fn, [h("ann")]);
assert.equal(u.fbc, "fb.1.1.x");
assert.equal(u.client_user_agent, "UA");
assert.equal(m.fbcFromFbclid("abc", 5), "fb.1.5.abc");
assert.equal(m.fbclidFromUrl("https://x.com/vsl?fbclid=Zz&a=1"), "Zz");
const ctx = { fbc: "fb.1.1.abc", fbp: "fb.1.2.3", ip: "1.2.3.4", ua: "Mozilla/5.0 ".repeat(20) };
const tok = m.encodeTrackingToken(ctx);
assert.ok(tok.length <= 900);
assert.deepEqual(m.decodeTrackingToken(tok), ctx);
const big = m.encodeTrackingToken({ ...ctx, ua: "x".repeat(5000) });
assert.equal(m.decodeTrackingToken(big).ua.length, 300);
assert.deepEqual(m.decodeTrackingToken("garbage"), {});
assert.equal(m.encodeTrackingToken({}), undefined);
assert.equal(cfg.scheduleEventId("abc-123"), "schedule_abc-123");
console.log("meta tests passed");
