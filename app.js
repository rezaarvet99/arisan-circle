// Arisan Circle — pure state logic (no DOM). Runs in browser and Node.
(function (root) {
  const api = {};

  let seq = 0;
  api._resetSeq = () => { seq = 0; };
  const nid = (p) => `${p}${Date.now().toString(36)}${(seq++).toString(36)}`;

  api.sampleData = () => ({
    groupName: "Arisan Keluarga",
    dues: 100000,
    members: [
      { id: "m1", name: "Ibu Ani" },
      { id: "m2", name: "Pak Budi" },
      { id: "m3", name: "Mbak Sari" },
      { id: "m4", name: "Mas Joko" },
      { id: "m5", name: "Tante Rina" },
    ],
    current: { n: 1, recipientId: null, paidIds: [] },
    rounds: [],
  });

  api.normalize = (s) => (s || "").trim().replace(/\s+/g, " ");

  api.memberName = (state, id) => {
    const m = state.members.find((x) => x.id === id);
    if (m) return m.name;
    for (const r of state.rounds) {
      const hit = (r.names || []).find((x) => x.id === id);
      if (hit) return hit.name;
    }
    return "?";
  };

  api.addMember = (state, name) => {
    name = api.normalize(name);
    if (!name) return { ok: false, error: "Nama tidak boleh kosong." };
    if (state.members.some((m) => m.name.toLowerCase() === name.toLowerCase()))
      return { ok: false, error: "Nama sudah ada." };
    const m = { id: nid("m"), name };
    return { ok: true, member: m, state: { ...state, members: [...state.members, m] } };
  };

  api.removeMember = (state, id) => ({
    ...state,
    members: state.members.filter((m) => m.id !== id),
    current: {
      ...state.current,
      paidIds: state.current.paidIds.filter((x) => x !== id),
      recipientId: state.current.recipientId === id ? null : state.current.recipientId,
    },
  });

  api.togglePaid = (state, id) => {
    if (!state.members.some((m) => m.id === id)) return state;
    const paid = state.current.paidIds.includes(id);
    return {
      ...state,
      current: {
        ...state.current,
        paidIds: paid
          ? state.current.paidIds.filter((x) => x !== id)
          : [...state.current.paidIds, id],
      },
    };
  };

  api.allPaid = (state) =>
    state.members.length > 0 &&
    state.members.every((m) => state.current.paidIds.includes(m.id));

  api.canDraw = (state) => api.allPaid(state) && !state.current.recipientId;

  api.pastRecipients = (state) => new Set(state.rounds.map((r) => r.recipientId));

  api.drawRecipient = (state, rand = Math.random) => {
    if (!api.canDraw(state)) return { ok: false, error: "Semua harus bayar dulu." };
    const past = api.pastRecipients(state);
    let pool = state.members.filter((m) => !past.has(m.id));
    if (!pool.length) pool = [...state.members];
    const pick = pool[Math.floor(rand() * pool.length)];
    return {
      ok: true,
      recipient: pick,
      state: { ...state, current: { ...state.current, recipientId: pick.id } },
    };
  };

  api.completeRound = (state) => {
    if (!state.current.recipientId) return { ok: false, error: "Belum ada penerima." };
    if (!api.allPaid(state)) return { ok: false, error: "Belum semua bayar." };
    const round = {
      n: state.current.n,
      recipientId: state.current.recipientId,
      paidIds: [...state.current.paidIds],
      names: state.members.map((m) => ({ id: m.id, name: m.name })),
      total: state.members.length * state.dues,
    };
    return {
      ok: true,
      round,
      state: {
        ...state,
        rounds: [...state.rounds, round],
        current: { n: state.current.n + 1, recipientId: null, paidIds: [] },
      },
    };
  };

  api.progress = (state) => ({
    paid: state.current.paidIds.length,
    total: state.members.length,
  });

  // Storage glue (browser only; Node tests pass their own store)
  api.STORAGE_KEY = "arisan-circle-v1";
  api.save = (state, store) => {
    const s = store || (typeof localStorage !== "undefined" ? localStorage : null);
    if (!s) return false;
    try { s.setItem(api.STORAGE_KEY, JSON.stringify(state)); return true; }
    catch { return false; }
  };
  api.load = (store) => {
    const s = store || (typeof localStorage !== "undefined" ? localStorage : null);
    if (!s) return null;
    try {
      const raw = s.getItem(api.STORAGE_KEY);
      if (!raw) return null;
      const st = JSON.parse(raw);
      if (!st || !Array.isArray(st.members)) return null;
      return st;
    } catch { return null; }
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Arisan = api;
})(typeof self !== "undefined" ? self : globalThis);
