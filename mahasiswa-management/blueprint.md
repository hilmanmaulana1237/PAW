You are GitHub Copilot acting as a senior React engineer.
TUJUAN: Bangun SPA "Manajemen Mahasiswa" (React, JavaScript murni) dengan:

- CRUD lengkap (persist ke localStorage + seed awal)
- Pencarian, pengurutan, pagination
- Halaman Dashboard (kartu ringkasan + mini chart SVG)
- Layout responsif dengan Sidebar menu + Topbar
- UI rapi, aksesibel, responsif, tanpa library UI berat
- React Router untuk navigasi
- Semua teks UI berbahasa Indonesia

BATASAN:

- Tanpa TypeScript, tanpa Redux. Pakai state lokal/Context bila perlu.
- Hormati struktur existing; jika belum ada, buat:
  /src, /src/pages, /src/components, /src/services, /src/utils, /src/styles
- Kode harus langsung jalan di Vite/CRA tanpa konfigurasi ekstra.
- Styling pakai CSS (global.css atau CSS Modules). Aksesibilitas: focus-visible, ARIA seperlunya.

MODEL DATA — Mahasiswa (sesuaikan istilah Indonesia):

- id (uuid), nim (string), nama (string), fakultas (string), jurusan (string),
  semester (1–14), ipk (0.00–4.00), email (format valid), hp (opsional), createdAt (ISO).
- Validasi: nim, nama, fakultas, jurusan, semester, ipk, email wajib. semester 1..14, ipk 0..4 (≤2 desimal), email regex sederhana, hp opsional (boleh +62).
- Placeholder & label form gunakan Bahasa Indonesia (contoh: "Masukkan NIM", "Nama Lengkap", "Simpan", "Batal").

REFERENSI ISI (sesuaikan seed data dengan program studi di Universitas Indonesia):

- Fakultas contoh (gunakan field "fakultas"): Teknik (FT), Ilmu Komputer (FASILKOM), Ekonomi dan Bisnis (FEB), Hukum (FH), Ilmu Sosial & Ilmu Politik (FISIP), Ilmu Pengetahuan Budaya (FIB), Kesehatan Masyarakat (FKM), Ilmu Keperawatan (FIK), Farmasi (FF), Psikologi (FPsi).
- Jurusan contoh yang sesuai UI (field "jurusan"), pilih minimal 10 untuk variasi:
  • Ilmu Komputer, Sistem Informasi (FASILKOM)
  • Teknik Industri, Teknik Mesin, Teknik Sipil, Teknik Elektro, Teknik Kimia, Teknik Metalurgi & Material, Arsitektur, Teknik Lingkungan, Teknik Komputer (FT)
  • Manajemen, Akuntansi, Ilmu Ekonomi (FEB)
  • Ilmu Hukum (FH)
  • Ilmu Komunikasi, Hubungan Internasional, Administrasi Niaga/Bisnis (FISIP/FIA)
  • Sastra Indonesia, Ilmu Perpustakaan (FIB)
  • Kesehatan Masyarakat, Gizi (FKM)
  • Ilmu Keperawatan (FIK)
  • Farmasi (FF)
  • Psikologi (FPsi)
- Gunakan nama Indonesia untuk seed (mis. "Aulia Pratama", "Siti Rahma", "Bagas Aditya"). NIM contoh format numerik 10 digit. IPK 2.50–3.90 bervariasi. Penyebaran semester 1–8. createdAt dalam 12 bulan terakhir.

FITUR

1. Dashboard ("/dashboard"):
   - Kartu ringkas (StatCard): Total Mahasiswa, Rata-rata IPK, Jumlah Fakultas/Jurusan unik, Mahasiswa Baru (7 hari terakhir).
   - Mini chart SVG (TinyBarChart) menampilkan distribusi jumlah mahasiswa per jurusan (top 5) atau per fakultas.
   - Kartu dapat diklik menuju daftar mahasiswa (dengan filter jika relevan).
2. Daftar Mahasiswa ("/"):
   - Kolom: NIM | Nama | Fakultas | Jurusan | Semester | IPK | Aksi
   - Pencarian client-side (NIM/Nama/Jurusan; debounced; case-insensitive)
   - Sort by: Nama, Semester, IPK (toggle asc/desc)
   - Pagination client-side (10/baris)
   - Opsional: ceklis bulk delete
3. Buat ("/students/new") & Ubah ("/students/:id/edit"):
   - <StudentForm> terkontrol, validasi inline, pesan error Indonesia
   - Buat: generate id + createdAt → kembali ke daftar
   - Ubah: load by id → simpan → kembali ke daftar
4. Detail (opsional "/students/:id"): kartu baca-saja
5. Hapus: dialog konfirmasi (ConfirmDialog)
6. Persistensi: localStorage; pertama kali jalankan seed 20–30 mahasiswa berbahasa Indonesia sesuai referensi UI.
7. UX: empty state, hint loading ringan, fokus/keyboard friendly.

KONTRAK SERVICE (/src/services/studentService.js):

- STORAGE_KEY = "ui-students:v1"
- seedIfEmpty(seedOptions?) // generate 20–30 data acak realistis
- getAll({ search, sortBy, sortDir, page, pageSize, fakultas?, jurusan? })
  -> { data, total, page, pageSize, totalPages }
- getById(id)
- create(input) // set id+createdAt
- update(id, input)
- remove(id)
- removeMany(ids)
- getStats() -> {
  total, avgIpk, fakultasCount, jurusanCount, newThisWeek,
  byJurusan: Array<{jurusan, count}>,
  byFakultas: Array<{fakultas, count}>,
  bySemester: Array<{semester, count}>
  }

ROUTING:

- "/dashboard" -> <Dashboard />
- "/" -> <StudentsList />
- "/students/new" -> <StudentCreate />
- "/students/:id/edit" -> <StudentEdit />
- "/students/:id" -> <StudentDetail /> (opsional)
- "/about" -> <About /> (statik)

DELIVERABLES (hasilkan SELURUH file, siap jalan):

- /src/main.jsx atau /src/index.jsx // React root
- /src/App.jsx // Router + Layout; import global.css
- /src/pages/Dashboard.jsx
- /src/pages/StudentsList.jsx
- /src/pages/StudentCreate.jsx
- /src/pages/StudentEdit.jsx
- /src/pages/StudentDetail.jsx (opsional)
- /src/pages/About.jsx
- /src/components/Layout.jsx // grid responsif: sidebar + main
- /src/components/Sidebar.jsx // menu: Dashboard, Mahasiswa, Tambah, About (aktif by route)
- /src/components/Topbar.jsx // judul app + tombol toggle sidebar (hamburger)
- /src/components/StudentTable.jsx
- /src/components/StudentRow.jsx
- /src/components/StudentForm.jsx
- /src/components/SearchBar.jsx
- /src/components/SortControl.jsx
- /src/components/Pagination.jsx
- /src/components/ConfirmDialog.jsx
- /src/components/StatCard.jsx
- /src/components/TinyBarChart.jsx // SVG murni (tanpa lib)
- /src/services/studentService.js
- /src/utils/validation.js // validateMahasiswa(input)
- /src/utils/formatters.js // formatIpk, formatTanggal, dll.
- /src/styles/global.css // tema, layout, tabel, form, sidebar; dukung dark mode (opsional)

GAYA & AKSESIBILITAS (/src/styles/global.css):

- Variabel: --space-_, --radius-_, --shadow-_, --color-_
- Root: font sistem, base 16px, line-height 1.5
- Container: max-width ~1100px; padding responsif
- Kartu: bg #fff, border #eee, radius 12px, shadow halus
- Tombol & input: ukuran konsisten; :focus-visible ring; hover state
- Tabel: zebra rows; header sticky di layar lebar; fallback kartu di layar sempit
- Sidebar: link aktif jelas; tombol hamburger untuk mobile; trap focus saat overlay
- Semua teks, placeholder, validation message gunakan Bahasa Indonesia.

QUALITY & DX:

- Komentar singkat di atas tiap file (tujuan/usage)
- Guard id tidak ditemukan di edit/detail
- Pencarian + sort + pagination dapat dikombinasikan
- README ringkas di komentar App: cara jalan (npm i; npm run dev) & build

OUTPUT YANG DIHARAPKAN:

1. Cetak tree proyek + catatan singkat fungsi tiap file.
2. Lalu tampilkan KODE LENGKAP untuk setiap file (urut agar mudah copy-paste).
3. Pastikan impor/ekspor benar dan aplikasi langsung berjalan.

MULAI dengan mengasumsikan template Vite React standar bila struktur belum terdeteksi. Lalu hasilkan file tree dan implementasi penuh.
