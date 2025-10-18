/**
 * StudentDetail.jsx
 * Halaman detail mahasiswa (read-only)
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../services/studentService';
import { formatIpk, formatTanggal, formatNomorHP } from '../utils/formatters';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const data = getById(id);
    if (data) {
      setStudent(data);
    } else {
      setNotFound(true);
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="not-found">
        <h1>Mahasiswa Tidak Ditemukan</h1>
        <p>Data mahasiswa dengan ID tersebut tidak ada.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  if (!student) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="student-detail">
      <div className="page-header">
        <h1 className="page-title">Detail Mahasiswa</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            ← Kembali
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/students/${id}/edit`)}>
            ✏️ Edit
          </button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">NIM:</span>
          <span className="detail-value">{student.nim}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Nama Lengkap:</span>
          <span className="detail-value">{student.nama}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Fakultas:</span>
          <span className="detail-value">{student.fakultas}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Jurusan:</span>
          <span className="detail-value">{student.jurusan}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Semester:</span>
          <span className="detail-value">{student.semester}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">IPK:</span>
          <span className="detail-value">{formatIpk(student.ipk)}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{student.email}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">No. HP:</span>
          <span className="detail-value">{formatNomorHP(student.hp)}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Tanggal Dibuat:</span>
          <span className="detail-value">{formatTanggal(student.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
