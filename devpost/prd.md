---
doc: prd
status: approved
---

# Arisan Circle — Product Requirements

One line: Pelacak arisan satu grup untuk bendahara — siapa bayar, siapa terima, riwayat putaran.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`.

## The Core Journey
1. Bendahara membuka app → langsung lihat grup contoh "Arisan Keluarga" (5 anggota, iuran Rp100.000).
2. Putaran berjalan terlihat: penerima ronde ini + daftar siapa sudah/belum bayar.
3. Bendahara klik nama anggota untuk tandai bayar (centang hijau).
4. Saat semua bayar, tombol "Undi penerima" aktif → klik → nama penerima muncul.
5. Klik "Putaran selesai" → ronde tersimpan ke riwayat, ronde baru dimulai dengan penerima berikut.
6. Tambah anggota baru lewat kolom nama + tombol tambah; hapus anggota bila perlu.

## Screens and Layout
Satu halaman, satu layar (scroll vertikal):
1. Header: nama grup + iuran per putaran (bisa diubah).
2. Kartu "Putaran #N": penerima ronde ini (atau tombol Undi), progres bayar (x/y).
3. Daftar anggota: tiap baris nama + tombol/status bayar + tombol hapus.
4. Form tambah anggota.
5. Tombol "Putaran selesai".
6. Riwayat putaran (daftar ronde lalu: penerima + total terkumpul).

## Look and Feel
Hangat Indonesia: latar krem, kartu putih, aksen hijau (bayar/lunas) + emas (penerima). Font sistem, besar dan lega. Bahasa Indonesia semua. Gaya: kartu besar, tombol jempol — bukan fintech dingin.

## Features and Behavior

### Grup dan anggota
- Nama grup dan nominal iuran bisa diubah, tersimpan.
- Tambah anggota (nama saja, tolak kosong/duplikat). Hapus anggota (konfirmasi).
- Acceptance: tambah "Budi" → muncul di daftar; reload → tetap ada.

### Tandai bayar
- Klik baris anggota = toggle sudah/belum bayar untuk putaran berjalan.
- Progres "3/5 sudah bayar" update langsung.
- Acceptance: klik 3 nama → progres 3/5; klik lagi → batal.

### Undi penerima
- Aktif hanya bila semua anggota sudah bayar. Acak dari anggota yang belum pernah terima di riwayat bila ada, jika tidak dari semua.
- Acceptance: semua bayar → tombol aktif → klik → nama penerima tampil.

### Putaran selesai + riwayat
- Menyimpan ronde (nomor, penerima, daftar bayar, total) ke riwayat, reset status bayar, nomor ronde +1.
- Acceptance: klik selesai → riwayat bertambah 1, status bayar reset, ronde N+1.

## States and Boundaries
- **First use** — data contoh langsung ada (5 anggota), demo jalan tanpa setup.
- **Empty state** — riwayat kosong → teks "Belum ada putaran selesai."
- **Error states** — nama kosong/duplikat → pesan singkat; undi sebelum semua bayar → tombol nonaktif + hint.
- **Persistence** — semua tersimpan di localStorage; tutup browser → data kembali.
- **Reset** — tombol "Mulai dari awal" (konfirmasi) untuk demo ulang.

## Product Decisions
- Satu grup saja — sesuai POC, multi-grup masuk Later.
- localStorage bukan server — juri tidak run kode, video yang dinilai; tetap persisten untuk demo.
- UI Bahasa Indonesia — pengguna bendahara lokal.
- Data contoh bawaan — demo 1 menit langsung jalan.

## What We're Building
Satu halaman web statis: grup + anggota (CRUD), tandai bayar, undi penerima, selesaikan putaran, riwayat, persist localStorage, data contoh, tombol reset.

## Deferred From the POC
Multi-grup (satu cukup untuk bukti inti); foto bukti transfer (butuh upload/server); share WhatsApp (nice-to-have, bukan inti).

## Possible Later Enhancements
Multi-grup. Ekspor riwayat. Pengingat jatuh tempo.

## Non-Goals
Login/akun — gesekan tanpa nilai demo. Database server — overkill untuk POC. Inggris — bukan bahasa pengguna.

## Open Questions
Tidak ada — semua terjawab sebelum spec.
