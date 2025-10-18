/**
 * StudentRow.jsx
 * Baris tabel mahasiswa individual
 */

import { formatIpk } from '../utils/formatters';

export default function StudentRow({ student, onEdit, onDelete, isSelected, onToggleSelect }) {
  return (
    <tr className={isSelected ? 'selected' : ''}>
      {onToggleSelect && (
        <td className="col-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onToggleSelect(student.id, e.target.checked)}
            aria-label={`Pilih ${student.nama}`}
          />
        </td>
      )}
      <td data-label="NIM">{student.nim}</td>
      <td data-label="Nama">{student.nama}</td>
      <td data-label="Fakultas">{student.fakultas}</td>
      <td data-label="Jurusan">{student.jurusan}</td>
      <td data-label="Semester">{student.semester}</td>
      <td data-label="IPK">{formatIpk(student.ipk)}</td>
      <td className="col-actions" data-label="Aksi">
        <div className="action-buttons">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(student.id)}
            title="Edit"
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(student.id)}
            title="Hapus"
          >
            🗑️ Hapus
          </button>
        </div>
      </td>
    </tr>
  );
}
