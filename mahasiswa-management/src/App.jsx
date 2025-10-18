/**
 * App.jsx
 * Root component dengan routing dan layout
 * 
 * Cara menjalankan:
 * 1. npm install
 * 2. npm run dev
 * 
 * Build production:
 * npm run build
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import StudentsList from './pages/StudentsList';
import StudentCreate from './pages/StudentCreate';
import StudentEdit from './pages/StudentEdit';
import StudentDetail from './pages/StudentDetail';
import About from './pages/About';
import { seedIfEmpty } from './services/studentService';
import './styles/global.css';

function App() {
  useEffect(() => {
    // Seed data jika localStorage kosong
    seedIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<StudentsList />} />
          <Route path="/students/new" element={<StudentCreate />} />
          <Route path="/students/:id/edit" element={<StudentEdit />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
