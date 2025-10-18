/**
 * studentService.js
 * Service untuk CRUD mahasiswa dengan localStorage.
 * Seed data awal menggunakan nama dan program studi Universitas Indonesia.
 */

const STORAGE_KEY = 'ui-students:v1';

// Data referensi Universitas Indonesia
const FAKULTAS_UI = [
  'Teknik (FT)',
  'Ilmu Komputer (FASILKOM)',
  'Ekonomi dan Bisnis (FEB)',
  'Hukum (FH)',
  'Ilmu Sosial & Ilmu Politik (FISIP)',
  'Ilmu Pengetahuan Budaya (FIB)',
  'Kesehatan Masyarakat (FKM)',
  'Ilmu Keperawatan (FIK)',
  'Farmasi (FF)',
  'Psikologi (FPsi)'
];

const JURUSAN_UI = [
  { jurusan: 'Ilmu Komputer', fakultas: 'Ilmu Komputer (FASILKOM)' },
  { jurusan: 'Sistem Informasi', fakultas: 'Ilmu Komputer (FASILKOM)' },
  { jurusan: 'Teknik Industri', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Mesin', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Sipil', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Elektro', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Kimia', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Metalurgi & Material', fakultas: 'Teknik (FT)' },
  { jurusan: 'Arsitektur', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Lingkungan', fakultas: 'Teknik (FT)' },
  { jurusan: 'Teknik Komputer', fakultas: 'Teknik (FT)' },
  { jurusan: 'Manajemen', fakultas: 'Ekonomi dan Bisnis (FEB)' },
  { jurusan: 'Akuntansi', fakultas: 'Ekonomi dan Bisnis (FEB)' },
  { jurusan: 'Ilmu Ekonomi', fakultas: 'Ekonomi dan Bisnis (FEB)' },
  { jurusan: 'Ilmu Hukum', fakultas: 'Hukum (FH)' },
  { jurusan: 'Ilmu Komunikasi', fakultas: 'Ilmu Sosial & Ilmu Politik (FISIP)' },
  { jurusan: 'Hubungan Internasional', fakultas: 'Ilmu Sosial & Ilmu Politik (FISIP)' },
  { jurusan: 'Administrasi Bisnis', fakultas: 'Ilmu Sosial & Ilmu Politik (FISIP)' },
  { jurusan: 'Sastra Indonesia', fakultas: 'Ilmu Pengetahuan Budaya (FIB)' },
  { jurusan: 'Ilmu Perpustakaan', fakultas: 'Ilmu Pengetahuan Budaya (FIB)' },
  { jurusan: 'Kesehatan Masyarakat', fakultas: 'Kesehatan Masyarakat (FKM)' },
  { jurusan: 'Gizi', fakultas: 'Kesehatan Masyarakat (FKM)' },
  { jurusan: 'Ilmu Keperawatan', fakultas: 'Ilmu Keperawatan (FIK)' },
  { jurusan: 'Farmasi', fakultas: 'Farmasi (FF)' },
  { jurusan: 'Psikologi', fakultas: 'Psikologi (FPsi)' }
];

const NAMA_INDONESIA = [
  'Aulia Pratama', 'Siti Rahma', 'Bagas Aditya', 'Putri Anggraini', 'Reza Maulana',
  'Dinda Safira', 'Farhan Hakim', 'Maya Kusuma', 'Arif Setiawan', 'Rani Permata',
  'Ilham Nugraha', 'Dewi Lestari', 'Rizky Ramadhan', 'Anisa Fitri', 'Faisal Ahmad',
  'Sinta Maharani', 'Budi Santoso', 'Zahra Amalia', 'Hendra Wijaya', 'Ayu Lestari',
  'Taufik Hidayat', 'Laila Sari', 'Eko Prasetyo', 'Nia Rahayu', 'Dani Irawan',
  'Fatimah Azzahra', 'Yudi Saputra', 'Indah Permatasari', 'Agung Wibowo', 'Sari Wahyuni'
];

function generateId() {
  return crypto.randomUUID();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, decimals = 2) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function randomDate(daysBack) {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime())).toISOString();
}

function generateNIM() {
  // Format: 10 digit numerik
  return String(randomInt(2000000000, 2099999999));
}

function generateEmail(nama) {
  const cleanName = nama.toLowerCase().replace(/\s+/g, '.');
  const domains = ['ui.ac.id', 'student.ui.ac.id'];
  return `${cleanName}@${domains[randomInt(0, 1)]}`;
}

function generatePhone() {
  if (Math.random() > 0.7) return ''; // 30% tanpa HP
  const prefix = Math.random() > 0.5 ? '+62' : '0';
  const digits = prefix === '+62' ? '8' : '';
  const length = randomInt(9, 11);
  let phone = prefix + digits;
  for (let i = 0; i < length; i++) {
    phone += randomInt(0, 9);
  }
  return phone;
}

export function seedIfEmpty() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return;

  const students = [];
  const count = randomInt(20, 30);

  for (let i = 0; i < count; i++) {
    const nama = NAMA_INDONESIA[i % NAMA_INDONESIA.length];
    const jurusanObj = JURUSAN_UI[randomInt(0, JURUSAN_UI.length - 1)];
    
    students.push({
      id: generateId(),
      nim: generateNIM(),
      nama,
      fakultas: jurusanObj.fakultas,
      jurusan: jurusanObj.jurusan,
      semester: randomInt(1, 8),
      ipk: randomFloat(2.5, 3.9, 2),
      email: generateEmail(nama),
      hp: generatePhone(),
      createdAt: randomDate(365)
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAll({ search = '', sortBy = 'nama', sortDir = 'asc', page = 1, pageSize = 10, fakultas, jurusan } = {}) {
  let data = loadData();

  // Filter
  if (search) {
    const q = search.toLowerCase();
    data = data.filter(s =>
      s.nim.toLowerCase().includes(q) ||
      s.nama.toLowerCase().includes(q) ||
      s.jurusan.toLowerCase().includes(q)
    );
  }

  if (fakultas) {
    data = data.filter(s => s.fakultas === fakultas);
  }

  if (jurusan) {
    data = data.filter(s => s.jurusan === jurusan);
  }

  // Sort
  data.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    
    if (sortBy === 'ipk' || sortBy === 'semester') {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = data.slice(start, start + pageSize);

  return { data: paginated, total, page, pageSize, totalPages };
}

export function getById(id) {
  const data = loadData();
  return data.find(s => s.id === id) || null;
}

export function create(input) {
  const data = loadData();
  const newStudent = {
    ...input,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  data.push(newStudent);
  saveData(data);
  return newStudent;
}

export function update(id, input) {
  const data = loadData();
  const index = data.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  data[index] = { ...data[index], ...input };
  saveData(data);
  return data[index];
}

export function remove(id) {
  let data = loadData();
  const filtered = data.filter(s => s.id !== id);
  if (filtered.length === data.length) return false;
  saveData(filtered);
  return true;
}

export function removeMany(ids) {
  let data = loadData();
  data = data.filter(s => !ids.includes(s.id));
  saveData(data);
  return true;
}

export function getStats() {
  const data = loadData();
  const total = data.length;
  const avgIpk = total > 0
    ? (data.reduce((sum, s) => sum + parseFloat(s.ipk), 0) / total).toFixed(2)
    : 0;

  const fakultasSet = new Set(data.map(s => s.fakultas));
  const jurusanSet = new Set(data.map(s => s.jurusan));

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newThisWeek = data.filter(s => new Date(s.createdAt) >= oneWeekAgo).length;

  // Distribusi per jurusan
  const jurusanCount = {};
  data.forEach(s => {
    jurusanCount[s.jurusan] = (jurusanCount[s.jurusan] || 0) + 1;
  });
  const byJurusan = Object.entries(jurusanCount)
    .map(([jurusan, count]) => ({ jurusan, count }))
    .sort((a, b) => b.count - a.count);

  // Distribusi per fakultas
  const fakultasCount = {};
  data.forEach(s => {
    fakultasCount[s.fakultas] = (fakultasCount[s.fakultas] || 0) + 1;
  });
  const byFakultas = Object.entries(fakultasCount)
    .map(([fakultas, count]) => ({ fakultas, count }))
    .sort((a, b) => b.count - a.count);

  // Distribusi per semester
  const semesterCount = {};
  data.forEach(s => {
    semesterCount[s.semester] = (semesterCount[s.semester] || 0) + 1;
  });
  const bySemester = Object.entries(semesterCount)
    .map(([semester, count]) => ({ semester: parseInt(semester), count }))
    .sort((a, b) => a.semester - b.semester);

  return {
    total,
    avgIpk,
    fakultasCount: fakultasSet.size,
    jurusanCount: jurusanSet.size,
    newThisWeek,
    byJurusan,
    byFakultas,
    bySemester
  };
}

export const FAKULTAS_LIST = FAKULTAS_UI;
export const JURUSAN_LIST = JURUSAN_UI;
