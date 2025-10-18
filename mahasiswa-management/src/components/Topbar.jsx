/**
 * Topbar.jsx
 * Header dengan judul aplikasi dan tombol hamburger
 */

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="topbar">
      <button 
        className="hamburger-btn" 
        onClick={onToggleSidebar}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <h1 className="topbar-title">Manajemen Mahasiswa UI</h1>
      
      <div className="topbar-end">
        {/* Bisa ditambahkan profil user, notifikasi, dll */}
      </div>
    </header>
  );
}
