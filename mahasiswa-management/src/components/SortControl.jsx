/**
 * SortControl.jsx
 * Kontrol pengurutan data
 */

export default function SortControl({ sortBy, sortDir, onSortChange }) {
  const sortOptions = [
    { value: 'nama', label: 'Nama' },
    { value: 'semester', label: 'Semester' },
    { value: 'ipk', label: 'IPK' }
  ];

  const handleSortByChange = (e) => {
    onSortChange(e.target.value, sortDir);
  };

  const toggleDirection = () => {
    onSortChange(sortBy, sortDir === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort-select" className="sort-label">Urutkan:</label>
      <select
        id="sort-select"
        className="sort-select"
        value={sortBy}
        onChange={handleSortByChange}
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      
      <button
        className="sort-direction-btn"
        onClick={toggleDirection}
        aria-label={`Urutkan ${sortDir === 'asc' ? 'menurun' : 'menaik'}`}
        title={sortDir === 'asc' ? 'Menaik (A-Z)' : 'Menurun (Z-A)'}
      >
        {sortDir === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
