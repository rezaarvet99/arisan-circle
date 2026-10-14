const assert = require("node:assert/strict");
const A = require("./app.js");
A._resetSeq();

let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log("ok -", name); };

// sample
t("sample has 5 members, round 1", () => {
  const s = A.sampleData();
  assert.equal(s.members.length, 5);
  assert.equal(s.current.n, 1);
  assert.equal(s.rounds.length, 0);
});

// addMember
t("reject empty name", () => {
  const s = A.sampleData();
  assert.equal(A.addMember(s, "   ").ok, false);
});
t("reject duplicate (case-insensitive)", () => {
  const s = A.sampleData();
  assert.equal(A.addMember(s, "ibu ani").ok, false);
});
t("add Budi", () => {
  const s = A.sampleData();
  const r = A.addMember(s, "Budi");
  assert.equal(r.ok, true);
  assert.equal(r.state.members.length, 6);
});

// toggle + progress
t("toggle paid updates progress", () => {
  let s = A.sampleData();
  s = A.togglePaid(s, "m1");
  s = A.togglePaid(s, "m2");
  s = A.togglePaid(s, "m3");
  assert.deepEqual(A.progress(s), { paid: 3, total: 5 });
  s = A.togglePaid(s, "m1");
  assert.deepEqual(A.progress(s), { paid: 2, total: 5 });
});

// draw gating
t("cannot draw before all paid", () => {
  const s = A.sampleData();
  assert.equal(A.drawRecipient(s).ok, false);
});
t("draw works when all paid", () => {
  let s = A.sampleData();
  for (const m of s.members) s = A.togglePaid(s, m.id);
  assert.equal(A.canDraw(s), true);
  const r = A.drawRecipient(s, () => 0);
  assert.equal(r.ok, true);
  assert.equal(r.recipient.id, "m1");
});

// complete round + history
t("complete round stores history, resets", () => {
  let s = A.sampleData();
  for (const m of s.members) s = A.togglePaid(s, m.id);
  s = A.drawRecipient(s, () => 0).state;
  const r = A.completeRound(s);
  assert.equal(r.ok, true);
  assert.equal(r.round.total, 500000);
  assert.equal(r.state.rounds.length, 1);
  assert.equal(r.state.current.n, 2);
  assert.equal(r.state.current.paidIds.length, 0);
  assert.equal(r.state.current.recipientId, null);
});

// avoid repeat recipient
t("second draw prefers member without prize yet", () => {
  let s = A.sampleData();
  for (const m of s.members) s = A.togglePaid(s, m.id);
  s = A.drawRecipient(s, () => 0).state;
  s = A.completeRound(s).state;
  for (const m of s.members) s = A.togglePaid(s, m.id);
  const r = A.drawRecipient(s, () => 0);
  assert.equal(r.recipient.id, "m2");
});

// removeMember keeps history names
t("remove member keeps history readable", () => {
  let s = A.sampleData();
  for (const m of s.members) s = A.togglePaid(s, m.id);
  s = A.drawRecipient(s, () => 0).state;
  s = A.completeRound(s).state;
  s = A.removeMember(s, "m1");
  assert.equal(A.memberName(s, "m1"), "Ibu Ani");
});

// storage round-trip with fake store
t("save/load round-trip", () => {
  const mem = {};
  const store = {
    getItem: (k) => (k in mem ? mem[k] : null),
    setItem: (k, v) => { mem[k] = String(v); },
  };
  let s = A.sampleData();
  assert.equal(A.save(s, store), true);
  const back = A.load(store);
  assert.equal(back.groupName, "Arisan Keluarga");
  assert.equal(back.members.length, 5);
});

console.log(`\n${pass} tests passed.`);
