/**
 * Layout.jsx
 * Layout responsif dengan Sidebar + Main content area
 */

import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-layout">
      <Topbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
      
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}
