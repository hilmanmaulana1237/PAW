# Manajemen Mahasiswa UI

Aplikasi Single Page Application (SPA) untuk mengelola data mahasiswa Universitas Indonesia. Dibangun dengan React dan menggunakan localStorage untuk persistensi data.

## 🚀 Fitur

- **Dashboard**: Statistik dan visualisasi data mahasiswa
- **CRUD Lengkap**: Tambah, edit, hapus, dan lihat data mahasiswa
- **Pencarian & Filter**: Cari mahasiswa berdasarkan NIM, nama, atau jurusan
- **Pengurutan**: Urutkan berdasarkan nama, semester, atau IPK
- **Pagination**: Navigasi halaman dengan mudah
- **Validasi Form**: Validasi input yang komprehensif
- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Persistensi Data**: Data tersimpan di localStorage browser

## 📋 Model Data

Setiap mahasiswa memiliki data:
- NIM (10 digit)
- Nama Lengkap
- Fakultas (10 fakultas UI)
- Jurusan (25+ program studi)
- Semester (1-14)
- IPK (0.00-4.00)
- Email
- No. HP (opsional)

## 🛠️ Teknologi

- React 19
- React Router v7
- Vite
- CSS murni (tanpa framework UI)
- localStorage API

## 📦 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser di `http://localhost:5173`

## 🏗️ Build Production

```bash
npm run build
npm run preview
```

## 📁 Struktur Proyek

```
src/
├── components/       # Komponen UI reusable
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── StatCard.jsx
│   ├── TinyBarChart.jsx
│   ├── SearchBar.jsx
│   ├── SortControl.jsx
│   ├── Pagination.jsx
│   ├── ConfirmDialog.jsx
│   ├── StudentTable.jsx
│   ├── StudentRow.jsx
│   └── StudentForm.jsx
├── pages/           # Halaman routing
│   ├── Dashboard.jsx
│   ├── StudentsList.jsx
│   ├── StudentCreate.jsx
│   ├── StudentEdit.jsx
│   ├── StudentDetail.jsx
│   └── About.jsx
├── services/        # Logic & data
│   └── studentService.js
├── utils/           # Helper functions
│   ├── validation.js
│   └── formatters.js
├── styles/          # Styling
│   └── global.css
├── App.jsx          # Root component + routing
└── main.jsx         # Entry point
```

## 🎨 Fitur UI

- **Sidebar Navigation**: Menu navigasi yang responsif
- **Dashboard Cards**: Kartu statistik yang dapat diklik
- **Mini Charts**: Visualisasi SVG untuk distribusi data
- **Responsive Table**: Tabel yang menyesuaikan dengan ukuran layar
- **Form Validation**: Validasi real-time dengan pesan error
- **Dialog Konfirmasi**: Konfirmasi sebelum menghapus data
- **Bulk Actions**: Hapus banyak data sekaligus

## 🔑 Fitur Utama

### Dashboard
- Total mahasiswa
- Rata-rata IPK
- Jumlah fakultas & jurusan
- Mahasiswa baru (7 hari terakhir)
- Chart distribusi per jurusan & fakultas

### Daftar Mahasiswa
- Tabel dengan kolom: NIM, Nama, Fakultas, Jurusan, Semester, IPK, Aksi
- Pencarian dengan debounce
- Pengurutan ascending/descending
- Pagination (10 item per halaman)
- Bulk delete dengan checkbox

### Form Input
- Validasi inline
- Auto-filter jurusan berdasarkan fakultas
- Pesan error dalam Bahasa Indonesia
- Field required yang jelas

## 📱 Responsiveness

- Desktop: Sidebar tetap terlihat
- Mobile: Sidebar overlay dengan hamburger menu
- Tabel: Berubah menjadi card view di mobile

## ♿ Aksesibilitas

- Focus indicators yang jelas
- ARIA labels untuk kontrol
- Keyboard navigation
- Semantic HTML

## 📝 Lisensi

MIT

## 👨‍💻 Pengembangan

Aplikasi ini menggunakan Vite untuk hot module replacement (HMR) yang cepat. Setiap perubahan akan langsung terlihat di browser.

### Seed Data

Aplikasi akan otomatis generate 20-30 data mahasiswa dengan:
- Nama Indonesia yang realistis
- Program studi sesuai fakultas UI
- Semester 1-8
- IPK 2.50-3.90
- Email UI (@ui.ac.id)
- Data dibuat dalam 12 bulan terakhir

### Storage Key

Data tersimpan di localStorage dengan key: `ui-students:v1`

Untuk reset data, hapus localStorage di browser DevTools atau jalankan:
```javascript
localStorage.removeItem('ui-students:v1')
```

Kemudian refresh halaman untuk generate data baru.


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
