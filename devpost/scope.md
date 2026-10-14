---
doc: scope
status: approved
---

# Arisan Circle

One line: Pelacak arisan sederhana — siapa bayar, siapa giliran terima, riwayat putaran.

## The Unique Kernel
Dibuat khusus untuk cara arisan Indonesia berjalan: daftar anggota tetap, iuran sama rata, undian giliran terima pot, dan status bayar per putaran — bukan expense tracker generik.

## Who It's For
Bendahara arisan keluarga/kos RT — misal ibu yang pegang arisan 10 orang Rp100rb/bulan, hari ini catat di buku tulis dan gampang lupa siapa belum bayar.

## The Core Loop
Buka app → lihat putaran berjalan (giliran siapa, siapa sudah/belum bayar) → centang bayar → putaran selesai, lanjut penerima berikutnya. Alasan kembali: tiap kumpul arisan dibuka lagi.

## Inspiration & Identity
Sederhana dan hangat, bukan fintech dingin. Kartu besar, tombol centang jempol, warna hijau-emas. Bahasa Indonesia di UI.

## Why This Matters to the Learner
Pengalaman hackathon pertama yang 100% online dan berguna untuk kehidupan nyata di Indonesia.

## What "Working" Looks Like
Buka satu halaman: nama grup + 5 anggota contoh, klik nama untuk tandai bayar, tombol "Undi penerima" jalan, tombol "Putaran selesai" pindah ke penerima berikut + riwayat bertambah. Momen "oh keren": penerima terundi muncul dengan animasi.

## The POC Boundary
IN: 1 grup, tambah/hapus anggota, iuran per putaran, tandai bayar per anggota, undi penerima, riwayat putaran, tersimpan di browser (localStorage).
IN juga: contoh data awal agar demo 1 menit langsung jalan.

## Later
Multi-grup, foto bukti transfer, share WhatsApp, akun + database online.

## Explicitly Cut
- Login/akun — tidak perlu untuk demo 1 grup, tambah gesekan.
- Database server — localStorage cukup, juri tidak run kode, video yang dinilai.
- Multi-bahasa — UI Indonesia saja, sesuai pengguna.
