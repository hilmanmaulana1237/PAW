/**
 * validation.js
 * Validasi input data mahasiswa sesuai model data Indonesia
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+62|0)[0-9]{9,12}$/;

export function validateMahasiswa(input) {
  const errors = {};

  // NIM wajib
  if (!input.nim || input.nim.trim() === '') {
    errors.nim = 'NIM wajib diisi';
  } else if (input.nim.trim().length < 5) {
    errors.nim = 'NIM minimal 5 karakter';
  }

  // Nama wajib
  if (!input.nama || input.nama.trim() === '') {
    errors.nama = 'Nama lengkap wajib diisi';
  } else if (input.nama.trim().length < 3) {
    errors.nama = 'Nama minimal 3 karakter';
  }

  // Fakultas wajib
  if (!input.fakultas || input.fakultas.trim() === '') {
    errors.fakultas = 'Fakultas wajib dipilih';
  }

  // Jurusan wajib
  if (!input.jurusan || input.jurusan.trim() === '') {
    errors.jurusan = 'Jurusan wajib dipilih';
  }

  // Semester wajib, rentang 1-14
  const sem = parseInt(input.semester, 10);
  if (!input.semester || isNaN(sem)) {
    errors.semester = 'Semester wajib diisi';
  } else if (sem < 1 || sem > 14) {
    errors.semester = 'Semester harus antara 1 sampai 14';
  }

  // IPK wajib, rentang 0-4, max 2 desimal
  const ipk = parseFloat(input.ipk);
  if (input.ipk === '' || input.ipk === null || input.ipk === undefined) {
    errors.ipk = 'IPK wajib diisi';
  } else if (isNaN(ipk)) {
    errors.ipk = 'IPK harus berupa angka';
  } else if (ipk < 0 || ipk > 4) {
    errors.ipk = 'IPK harus antara 0.00 sampai 4.00';
  } else if (!/^\d+(\.\d{1,2})?$/.test(input.ipk.toString())) {
    errors.ipk = 'IPK maksimal 2 angka desimal';
  }

  // Email wajib, format valid
  if (!input.email || input.email.trim() === '') {
    errors.email = 'Email wajib diisi';
  } else if (!EMAIL_REGEX.test(input.email.trim())) {
    errors.email = 'Format email tidak valid';
  }

  // HP opsional, tapi kalau diisi harus valid
  if (input.hp && input.hp.trim() !== '' && !PHONE_REGEX.test(input.hp.trim())) {
    errors.hp = 'Format nomor HP tidak valid (gunakan +62 atau 0 diikuti 9-12 digit)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
