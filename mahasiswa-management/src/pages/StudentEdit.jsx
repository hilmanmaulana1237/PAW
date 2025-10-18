/**
 * StudentEdit.jsx
 * Halaman edit data mahasiswa
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, update } from '../services/studentService';
import StudentForm from '../components/StudentForm';

export default function StudentEdit() {
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

  const handleSubmit = (formData) => {
    update(id, formData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

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
    <div className="student-edit">
      <h1 className="page-title">Edit Data Mahasiswa</h1>
      
      <div className="form-container">
        <StudentForm
          initialData={student}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
