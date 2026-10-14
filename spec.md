---
doc: spec
status: approved
---

# Arisan Circle — Technical Spec

## How This Works, In Plain Language
Satu halaman web (index.html) + satu file logika (app.js). Semua data (grup, anggota, putaran) disimpan di browser (localStorage) — tutup-buka browser data tetap ada. Tidak ada server, tidak ada login. Buka file di browser langsung jalan, cocok untuk direkam jadi video demo 1–3 menit.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
1. Pengguna buka index.html → app.js load data dari localStorage (atau data contoh saat pertama kali) → tampil grup + anggota + putaran.
2. Klik nama anggota → togglePaid update status bayar → simpan → daftar + progres render ulang.
3. Semua bayar → tombol Undi aktif → klik → drawRecipient pilih nama → tampil sebagai penerima.
4. Klik Selesai → completeRound simpan ronde ke riwayat → reset status → ronde N+1 tampil.
5. Tambah/hapus anggota → update daftar → simpan.

## Stack
- HTML + CSS + JavaScript polos, satu halaman, tanpa framework, tanpa build step.
- Penyimpanan: browser localStorage (key `arisan-circle-v1`).
- Docs: MDN localStorage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- Rationale: paling sederhana untuk POC statis; juri tidak run kode, video yang dinilai. Tradeoff diterima: data hanya di satu browser (multi-device masuk Later).

## Where It Runs and How Someone Tries It
Browser modern (Chrome/Edge) di laptop, tanpa install. Cara jalan: buka `index.html` double-click, atau `npx serve .` lalu buka URL-nya. Untuk rekaman demo: buka halaman → tandai bayar → undi → selesaikan → tunjukkan riwayat. Submission butuh video demo + repo publik; deploy opsional, tidak menggantikan video.

## Look and Feel
Latar krem (#faf6ef), kartu putih rounded, aksen hijau (#1f8a4c) untuk lunas, emas (#b8860b) untuk penerima. Font sistem, ukuran besar, lega. Semua teks Indonesia. Gaya kartu besar + tombol jempol.

## Components

### State (app.js)
Logika murni: sampleData, addMember, removeMember, togglePaid, canDraw, drawRecipient, completeRound, save/load. Tanpa DOM — bisa dites di Node.
PRD ref: `prd.md > Features and Behavior`.

### UI (index.html)
Render state ke layar + event klik: header grup, kartu putaran, daftar anggota, form tambah, tombol undi/selesai, riwayat, reset. Baca/tulis via State + localStorage.
PRD ref: `prd.md > Screens and Layout`, `prd.md > Look and Feel`.

## Data Model
```js
state = {
  groupName: "Arisan Keluarga",
  dues: 100000,
  members: [{id:"m1", name:"..."}],
  current: { n: 1, recipientId: null, paidIds: [] },
  rounds: [{ n:1, recipientId, paidIds:[...], total: 500000 }]
}
```
Tersimpan utuh sebagai JSON di localStorage key `arisan-circle-v1`. Ditulis tiap perubahan, dibaca saat buka. Contoh bawaan: 5 anggota saat pertama kali.

## File Structure
```
build-ai-basics/
├── index.html        # satu-satunya halaman: struktur + gaya + muat app.js
├── app.js            # logika state murni + glue UI browser
├── test.js           # tes Node untuk logika (ilang sebelum submit? tetap, buktikan jalan)
├── devpost/          # learner-profile.md, scope.md, prd.md, spec.md, checklist.md
└── agent/skills/     # skill pack resmi (wajib ada jejaknya)
```

## External Services and Dependencies
Tidak ada. Tanpa API, tanpa database, tanpa hosting wajib. Biaya Rp0.

## Important Failure Modes
- **localStorage penuh/diblokir (private mode)** → app tetap jalan di memori sesi itu + pesan "data tidak tersimpan permanen".
- **Nama kosong/duplikat** → ditolak + pesan singkat, tidak crash.
- **Anggota dihapus padahal penerima/riwayat** → riwayat simpan nama snapshot, tidak rusak.

## What Was Simplified and Why
- **localStorage** instead of database/server — juri tidak run kode; server butuh hosting + biaya. Versi penuh butuh backend + akun.
- **Satu grup** instead of multi-grup — inti POC satu lingkaran arisan. Multi-grup butuh navigasi + skema data lebih rumit.
- **File statis** instead of framework/build — tanpa install, langsung dibuka dan direkam.

## Decisions and Open Issues
- Stack HTML polos (pilihan agent, disetujui learner via mode hands-off): alasan incar demo tercepat; tradeoff tanpa komponen modern — diterima untuk POC.
- Satu ketidakpastian learner: "scope/PRD/spec itu apa" — diklarifikasi: dokumen syarat lomba yang menunjukkan proses perencanaan; bukti di devpost/*.md ini.
- Open: URL repo publik + URL video — diisi saat ship (butuh otorisasi + akun user).
