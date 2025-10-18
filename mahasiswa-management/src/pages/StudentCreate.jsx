/**
 * StudentCreate.jsx
 * Halaman tambah mahasiswa baru
 */

import { useNavigate } from 'react-router-dom';
import { create } from '../services/studentService';
import StudentForm from '../components/StudentForm';

export default function StudentCreate() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    create(formData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="student-create">
      <h1 className="page-title">Tambah Mahasiswa Baru</h1>
      
      <div className="form-container">
        <StudentForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
