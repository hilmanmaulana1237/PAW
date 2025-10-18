# Struktur Proyek Manajemen Mahasiswa UI

## Tree Struktur

```
mahasiswa-management/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/          # Komponen UI reusable
│   │   ├── ConfirmDialog.jsx       # Dialog konfirmasi untuk hapus data
│   │   ├── Layout.jsx              # Layout wrapper dengan sidebar & topbar
│   │   ├── Pagination.jsx          # Kontrol pagination
│   │   ├── SearchBar.jsx           # Input pencarian dengan debounce
│   │   ├── Sidebar.jsx             # Menu navigasi sidebar
│   │   ├── SortControl.jsx         # Kontrol pengurutan data
│   │   ├── StatCard.jsx            # Kartu statistik untuk dashboard
│   │   ├── StudentForm.jsx         # Form input/edit mahasiswa
│   │   ├── StudentRow.jsx          # Baris tabel mahasiswa
│   │   ├── StudentTable.jsx        # Tabel daftar mahasiswa
│   │   ├── TinyBarChart.jsx        # Mini chart SVG
│   │   └── Topbar.jsx              # Header dengan hamburger menu
│   ├── pages/               # Halaman routing
│   │   ├── About.jsx               # Halaman tentang aplikasi
│   │   ├── Dashboard.jsx           # Halaman dashboard dengan stats
│   │   ├── StudentCreate.jsx       # Halaman tambah mahasiswa
│   │   ├── StudentDetail.jsx       # Halaman detail mahasiswa
│   │   ├── StudentEdit.jsx         # Halaman edit mahasiswa
│   │   └── StudentsList.jsx        # Halaman daftar mahasiswa
│   ├── services/            # Logic & data services
│   │   └── studentService.js       # CRUD operations & localStorage
│   ├── styles/              # Styling
│   │   └── global.css              # CSS global dengan responsiveness
│   ├── utils/               # Helper functions
│   │   ├── formatters.js           # Format IPK, tanggal, dll
│   │   └── validation.js           # Validasi form mahasiswa
│   ├── App.css
│   ├── App.jsx                     # Root component + routing
│   ├── index.css
│   └── main.jsx                    # Entry point React
├── .gitignore
├── blueprint.md                    # Blueprint spesifikasi proyek
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Fungsi Setiap File

### 📁 Components (`src/components/`)

1. **Layout.jsx**
   - Container utama aplikasi dengan grid layout
   - Mengelola state sidebar (open/close)
   - Render Topbar, Sidebar, dan main content

2. **Sidebar.jsx**
   - Menu navigasi dengan NavLink
   - Indikator rute aktif
   - Responsive dengan overlay di mobile

3. **Topbar.jsx**
   - Header aplikasi dengan judul
   - Tombol hamburger untuk toggle sidebar
   - Fixed position di atas

4. **StatCard.jsx**
   - Kartu statistik dengan icon dan nilai
   - Support clickable untuk navigasi
   - Digunakan di dashboard

5. **TinyBarChart.jsx**
   - Chart SVG murni tanpa library
   - Visualisasi distribusi data
   - Labels dengan count

6. **SearchBar.jsx**
   - Input pencarian dengan debounce 300ms
   - Mengurangi re-render
   - Icon search

7. **SortControl.jsx**
   - Select untuk pilihan sort (nama/semester/IPK)
   - Tombol toggle asc/desc
   - Kombinasi sort by & direction

8. **Pagination.jsx**
   - Navigasi halaman dengan ellipsis
   - Tombol prev/next
   - Disable state untuk edge cases

9. **ConfirmDialog.jsx**
   - Modal konfirmasi untuk aksi berbahaya
   - Support single & bulk delete
   - Overlay dengan click outside to close

10. **StudentTable.jsx**
    - Tabel responsif dengan header
    - Checkbox untuk bulk selection
    - Responsive: table → cards di mobile

11. **StudentRow.jsx**
    - Baris individual tabel mahasiswa
    - Tombol edit & delete
    - Support checkbox selection

12. **StudentForm.jsx**
    - Form input lengkap dengan validasi
    - Auto-filter jurusan by fakultas
    - Inline error messages
    - Controlled inputs

### 📁 Pages (`src/pages/`)

1. **Dashboard.jsx**
   - Statistik: total, avg IPK, fakultas, jurusan, new students
   - Mini charts distribusi
   - Clickable cards ke halaman list

2. **StudentsList.jsx**
   - Daftar mahasiswa dengan tabel
   - Search, sort, pagination
   - Bulk delete dengan checkbox
   - Dialog konfirmasi hapus

3. **StudentCreate.jsx**
   - Form tambah mahasiswa baru
   - Redirect ke list setelah sukses

4. **StudentEdit.jsx**
   - Load data by ID
   - Form edit dengan initial data
   - Guard untuk ID not found

5. **StudentDetail.jsx**
   - View read-only data mahasiswa
   - Format data dengan helper
   - Tombol edit & kembali

6. **About.jsx**
   - Informasi aplikasi
   - Fitur, teknologi, cara pakai
   - Static content

### 📁 Services (`src/services/`)

**studentService.js**
- `STORAGE_KEY`: Key localStorage
- `seedIfEmpty()`: Generate 20-30 data awal
- `getAll()`: Get dengan filter, sort, pagination
- `getById(id)`: Get single mahasiswa
- `create(input)`: Tambah mahasiswa baru
- `update(id, input)`: Update mahasiswa
- `remove(id)`: Hapus single
- `removeMany(ids)`: Bulk delete
- `getStats()`: Statistik untuk dashboard
- Export: `FAKULTAS_LIST`, `JURUSAN_LIST`

### 📁 Utils (`src/utils/`)

1. **validation.js**
   - `validateMahasiswa(input)`: Validasi semua field
   - Return: `{ isValid, errors }`
   - Regex untuk email & HP

2. **formatters.js**
   - `formatIpk()`: Format ke 2 desimal
   - `formatTanggal()`: Format ke Bahasa Indonesia
   - `formatTanggalSingkat()`: Format singkat
   - `formatNomorHP()`: Format HP
   - `capitalize()`: Capitalize string

### 📁 Styles (`src/styles/`)

**global.css**
- CSS Variables untuk tema
- Reset & base styles
- Layout: grid dengan sidebar
- Responsive breakpoints (768px)
- Components: buttons, cards, tables, forms
- Accessibility: focus-visible
- Dark mode ready (optional)

### 📁 Root Files

1. **App.jsx**
   - BrowserRouter setup
   - Routes configuration
   - Layout wrapper
   - Seed data on mount

2. **main.jsx**
   - React entry point
   - StrictMode wrapper

3. **package.json**
   - Dependencies: react, react-dom, react-router-dom
   - Scripts: dev, build, preview
   - Vite configuration

## 🔄 Data Flow

1. **Initial Load**
   ```
   App.jsx (useEffect) → seedIfEmpty() → localStorage
   ```

2. **Read Data**
   ```
   Page Component → getAll/getById() → localStorage → Render
   ```

3. **Create/Update**
   ```
   Form → onSubmit → create/update() → localStorage → navigate('/')
   ```

4. **Delete**
   ```
   Table → onClick → ConfirmDialog → remove() → localStorage → reload
   ```

5. **Search/Sort/Pagination**
   ```
   Component state → getAll(params) → filtered/sorted data → Render
   ```

## 🎯 Key Features

- **localStorage Persistence**: Data survive refresh
- **Client-side Operations**: No backend needed
- **Seed Data**: Auto-generate realistic data
- **Responsive**: Mobile-first design
- **Accessible**: ARIA, focus management
- **Validated**: Form validation dengan Indonesian messages
- **Routed**: SPA dengan React Router
- **Modular**: Component reusability

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Buka http://localhost:5173
