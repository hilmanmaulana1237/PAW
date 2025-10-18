/**
 * StudentTable.jsx
 * Tabel daftar mahasiswa dengan responsivitas
 */

import StudentRow from './StudentRow';

export default function StudentTable({ students, onEdit, onDelete, selectedIds = [], onToggleSelect }) {
  if (!students || students.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada data mahasiswa</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            {onToggleSelect && (
              <th className="col-checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.length === students.length && students.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      students.forEach(s => onToggleSelect(s.id, true));
                    } else {
                      students.forEach(s => onToggleSelect(s.id, false));
                    }
                  }}
                  aria-label="Pilih semua"
                />
              </th>
            )}
            <th>NIM</th>
            <th>Nama</th>
            <th>Fakultas</th>
            <th>Jurusan</th>
            <th>Semester</th>
            <th>IPK</th>
            <th className="col-actions">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <StudentRow
              key={student.id}
              student={student}
              onEdit={onEdit}
              onDelete={onDelete}
              isSelected={selectedIds.includes(student.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
