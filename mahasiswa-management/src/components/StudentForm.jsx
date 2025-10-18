/**
 * StudentForm.jsx
 * Form input/edit mahasiswa dengan validasi
 */

import { useState, useEffect } from 'react';
import { validateMahasiswa } from '../utils/validation';
import { FAKULTAS_LIST, JURUSAN_LIST } from '../services/studentService';

export default function StudentForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    fakultas: '',
    jurusan: '',
    semester: '',
    ipk: '',
    email: '',
    hp: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [availableJurusan, setAvailableJurusan] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    // Filter jurusan berdasarkan fakultas yang dipilih
    if (formData.fakultas) {
      const filtered = JURUSAN_LIST.filter(j => j.fakultas === formData.fakultas);
      setAvailableJurusan(filtered);
      
      // Reset jurusan jika tidak sesuai dengan fakultas baru
      const currentJurusanValid = filtered.some(j => j.jurusan === formData.jurusan);
      if (!currentJurusanValid) {
        setFormData(prev => ({ ...prev, jurusan: '' }));
      }
    } else {
      setAvailableJurusan([]);
    }
  }, [formData.fakultas, formData.jurusan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validasi field ini
    const validation = validateMahasiswa(formData);
    if (validation.errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validation.errors[name] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validation = validateMahasiswa(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nim">NIM <span className="required">*</span></label>
          <input
            type="text"
            id="nim"
            name="nim"
            className={errors.nim && touched.nim ? 'error' : ''}
            value={formData.nim}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Masukkan NIM"
            required
          />
          {errors.nim && touched.nim && <span className="error-message">{errors.nim}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="nama">Nama Lengkap <span className="required">*</span></label>
          <input
            type="text"
            id="nama"
            name="nama"
            className={errors.nama && touched.nama ? 'error' : ''}
            value={formData.nama}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Masukkan nama lengkap"
            required
          />
          {errors.nama && touched.nama && <span className="error-message">{errors.nama}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fakultas">Fakultas <span className="required">*</span></label>
          <select
            id="fakultas"
            name="fakultas"
            className={errors.fakultas && touched.fakultas ? 'error' : ''}
            value={formData.fakultas}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">Pilih Fakultas</option>
            {FAKULTAS_LIST.map(fak => (
              <option key={fak} value={fak}>{fak}</option>
            ))}
          </select>
          {errors.fakultas && touched.fakultas && <span className="error-message">{errors.fakultas}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jurusan">Jurusan <span className="required">*</span></label>
          <select
            id="jurusan"
            name="jurusan"
            className={errors.jurusan && touched.jurusan ? 'error' : ''}
            value={formData.jurusan}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!formData.fakultas}
            required
          >
            <option value="">Pilih Jurusan</option>
            {availableJurusan.map(jur => (
              <option key={jur.jurusan} value={jur.jurusan}>{jur.jurusan}</option>
            ))}
          </select>
          {errors.jurusan && touched.jurusan && <span className="error-message">{errors.jurusan}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="semester">Semester <span className="required">*</span></label>
          <input
            type="number"
            id="semester"
            name="semester"
            className={errors.semester && touched.semester ? 'error' : ''}
            value={formData.semester}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1-14"
            min="1"
            max="14"
            required
          />
          {errors.semester && touched.semester && <span className="error-message">{errors.semester}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ipk">IPK <span className="required">*</span></label>
          <input
            type="number"
            id="ipk"
            name="ipk"
            className={errors.ipk && touched.ipk ? 'error' : ''}
            value={formData.ipk}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0.00 - 4.00"
            step="0.01"
            min="0"
            max="4"
            required
          />
          {errors.ipk && touched.ipk && <span className="error-message">{errors.ipk}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            className={errors.email && touched.email ? 'error' : ''}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="contoh@ui.ac.id"
            required
          />
          {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hp">No. HP (opsional)</label>
          <input
            type="tel"
            id="hp"
            name="hp"
            className={errors.hp && touched.hp ? 'error' : ''}
            value={formData.hp}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+62 atau 08xx"
          />
          {errors.hp && touched.hp && <span className="error-message">{errors.hp}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
}
