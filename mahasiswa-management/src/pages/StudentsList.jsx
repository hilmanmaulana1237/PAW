/**
 * StudentsList.jsx
 * Halaman daftar mahasiswa dengan pencarian, sort, pagination
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAll, remove, removeMany } from '../services/studentService';
import StudentTable from '../components/StudentTable';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import Pagination from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';

export default function StudentsList() {
  const navigate = useNavigate();
  const [data, setData] = useState({ data: [], total: 0, page: 1, pageSize: 10, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('nama');
  const [sortDir, setSortDir] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, isBulk: false });

  const loadData = useCallback(() => {
    const result = getAll({
      search,
      sortBy,
      sortDir,
      page: currentPage,
      pageSize: 10
    });
    setData(result);
  }, [search, sortBy, sortDir, currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSortChange = (newSortBy, newSortDir) => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    navigate(`/students/${id}/edit`);
  };

  const handleDelete = (id) => {
    setDeleteDialog({ isOpen: true, id, isBulk: false });
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setDeleteDialog({ isOpen: true, id: null, isBulk: true });
  };

  const confirmDelete = () => {
    if (deleteDialog.isBulk) {
      removeMany(selectedIds);
      setSelectedIds([]);
    } else {
      remove(deleteDialog.id);
    }
    setDeleteDialog({ isOpen: false, id: null, isBulk: false });
    loadData();
  };

  const cancelDelete = () => {
    setDeleteDialog({ isOpen: false, id: null, isBulk: false });
  };

  const handleToggleSelect = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(sid => sid !== id));
    }
  };

  return (
    <div className="students-list">
      <div className="page-header">
        <h1 className="page-title">Daftar Mahasiswa</h1>
        <button className="btn btn-primary" onClick={() => navigate('/students/new')}>
          ➕ Tambah Mahasiswa
        </button>
      </div>

      <div className="controls-bar">
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari NIM, nama, atau jurusan..."
        />
        
        <SortControl
          sortBy={sortBy}
          sortDir={sortDir}
          onSortChange={handleSortChange}
        />
      </div>

      {selectedIds.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedIds.length} item terpilih</span>
          <button className="btn btn-danger btn-sm" onClick={handleBulkDelete}>
            🗑️ Hapus Terpilih
          </button>
        </div>
      )}

      <StudentTable
        students={data.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Konfirmasi Hapus"
        message={
          deleteDialog.isBulk
            ? `Apakah Anda yakin ingin menghapus ${selectedIds.length} mahasiswa terpilih?`
            : 'Apakah Anda yakin ingin menghapus mahasiswa ini?'
        }
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
