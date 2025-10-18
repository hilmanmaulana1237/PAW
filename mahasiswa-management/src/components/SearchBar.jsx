/**
 * SearchBar.jsx
 * Input pencarian dengan debounce
 */

import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Cari...' }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Pencarian"
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}
