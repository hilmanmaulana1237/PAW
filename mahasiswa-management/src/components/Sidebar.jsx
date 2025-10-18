/**
 * Sidebar.jsx
 * Menu navigasi dengan indikator rute aktif
 */

import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={onClose}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={onClose}
          end
        >
          <span className="nav-icon">👥</span>
          Daftar Mahasiswa
        </NavLink>
        
        <NavLink 
          to="/students/new" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={onClose}
        >
          <span className="nav-icon">➕</span>
          Tambah Mahasiswa
        </NavLink>
        
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          onClick={onClose}
        >
          <span className="nav-icon">ℹ️</span>
          Tentang
        </NavLink>
      </nav>
    </aside>
  );
}
