/**
 * Pagination.jsx
 * Kontrol pagination
 */

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  
  // Tampilkan max 7 halaman
  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, currentPage + 3);
  
  if (endPage - startPage < 6) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 6);
    } else {
      startPage = Math.max(1, endPage - 6);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya"
      >
        ← Sebelumnya
      </button>
      
      <div className="pagination-pages">
        {startPage > 1 && (
          <>
            <button className="pagination-number" onClick={() => onPageChange(1)}>1</button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pages.map(page => (
          <button
            key={page}
            className={`pagination-number ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button className="pagination-number" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
          </>
        )}
      </div>
      
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Halaman berikutnya"
      >
        Berikutnya →
      </button>
    </div>
  );
}
