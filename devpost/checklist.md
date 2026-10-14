---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [ ] **1. State arisan jalan + tes hijau**
  Becomes usable: Logika inti (anggota, bayar, undi, putaran, riwayat) terbukti lewat tes Node.
  Why now: Risiko inti adalah aturan arisan, bukan tampilan — buktikan dulu sebelum ada UI.
  PRD ref: `prd.md > Features and Behavior`
  Spec ref: `spec.md > Components`, `spec.md > Data Model`
  Build: Tulis app.js (state murni, browser-safe) + test.js (Node assert).
  Verify (mechanical): `node test.js` → semua tes lolos.
  Learner check: Buka index.html, tambah nama, klik bayar, undi, selesaikan — riwayat bertambah.
  Commit: `Add arisan state logic with tests`

- [ ] **2. UI satu halaman lengkap**
  Becomes usable: Satu halaman hangat Indonesia: grup, putaran, anggota, undi, selesai, riwayat, persist.
  Why now: Kernel harus terlihat dan bisa direkam 1 menit.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Components`, `spec.md > File Structure`
  Build: Tulis index.html (struktur+gaya+glue UI), sambung ke app.js, localStorage, contoh bawaan, reset.
  Verify (mechanical): Buka halaman (serve), klik tiap tombol manual via skrip cek; reload → data tetap.
  Learner check: Coba alur penuh dan katakan apakah terasa seperti arisan.
  Commit: `Add one-page UI with persistence`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — slice 1 (tes hijau + alur klik)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: []
Route and stops: []
Edit outcome: []
Reflection: []
Activity mode: []

## Revisions
