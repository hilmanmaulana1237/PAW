/**
 * About.jsx
 * Halaman tentang aplikasi
 */

export default function About() {
  return (
    <div className="about-page">
      <h1 className="page-title">Tentang Aplikasi</h1>
      
      <div className="about-card">
        <h2>Manajemen Mahasiswa UI</h2>
        <p>
          Aplikasi Single Page Application (SPA) untuk mengelola data mahasiswa
          Universitas Indonesia. Dibangun dengan React dan menggunakan localStorage
          untuk persistensi data.
        </p>

        <h3>Fitur Utama:</h3>
        <ul>
          <li>📊 Dashboard dengan statistik dan visualisasi data</li>
          <li>👥 Daftar mahasiswa dengan pencarian dan pengurutan</li>
          <li>➕ Tambah, edit, dan hapus data mahasiswa</li>
          <li>✅ Validasi form yang komprehensif</li>
          <li>📱 Desain responsif untuk mobile dan desktop</li>
          <li>💾 Data tersimpan di localStorage browser</li>
        </ul>

        <h3>Teknologi:</h3>
        <ul>
          <li>React 18</li>
          <li>React Router v6</li>
          <li>Vite</li>
          <li>CSS murni (tanpa framework UI)</li>
        </ul>

        <h3>Cara Penggunaan:</h3>
        <ol>
          <li>Gunakan menu sidebar untuk navigasi</li>
          <li>Dashboard menampilkan ringkasan statistik mahasiswa</li>
          <li>Daftar Mahasiswa untuk melihat, cari, dan kelola data</li>
          <li>Gunakan form untuk menambah atau mengedit mahasiswa</li>
          <li>Data otomatis tersimpan di browser Anda</li>
        </ol>

        <div className="about-footer">
          <p>
            <strong>Versi:</strong> 1.0.0<br />
            <strong>Tahun:</strong> 2025
          </p>
        </div>
      </div>
    </div>
  );
}
