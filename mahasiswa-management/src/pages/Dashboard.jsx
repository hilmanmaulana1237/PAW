/**
 * Dashboard.jsx
 * Halaman dashboard dengan statistik dan chart
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats } from '../services/studentService';
import StatCard from '../components/StatCard';
import TinyBarChart from '../components/TinyBarChart';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStats();
    setStats(data);
  }, []);

  if (!stats) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Total Mahasiswa"
          value={stats.total}
          icon="👥"
          onClick={() => navigate('/')}
        />
        
        <StatCard
          title="Rata-rata IPK"
          value={stats.avgIpk}
          icon="📚"
        />
        
        <StatCard
          title="Jumlah Fakultas"
          value={stats.fakultasCount}
          icon="🏛️"
        />
        
        <StatCard
          title="Jumlah Jurusan"
          value={stats.jurusanCount}
          icon="🎓"
        />
        
        <StatCard
          title="Mahasiswa Baru"
          value={stats.newThisWeek}
          icon="✨"
          subtitle="7 hari terakhir"
        />
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <TinyBarChart
            title="Top 5 Jurusan"
            data={stats.byJurusan.slice(0, 5)}
          />
        </div>
        
        <div className="chart-card">
          <TinyBarChart
            title="Distribusi Fakultas"
            data={stats.byFakultas.slice(0, 5)}
          />
        </div>
      </div>
    </div>
  );
}
