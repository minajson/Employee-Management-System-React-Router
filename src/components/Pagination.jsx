
import React from "react";


/** Ellipsis-aware page list */
function usePagination({ totalPages, currentPage, siblingCount = 1 }) {
  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);
  if (totalPages <= 1) return [1];

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const firstPage = 1;
  const lastPage = totalPages;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount);
    return [...leftRange, "dots", lastPage];
  }
  if (showLeftDots && !showRightDots) {
    const rightRange = range(totalPages - (2 * siblingCount + 2), totalPages);
    return [firstPage, "dots", ...rightRange];
  }
  if (showLeftDots && showRightDots) {
    const middleRange = range(leftSibling, rightSibling);
    return [firstPage, "dots", ...middleRange, "dots", lastPage];
  }
  return range(1, totalPages);
}

export default function Pagination({
  page,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  compact = false, // set true on very small screens if you like
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = usePagination({ totalPages, currentPage: page });

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav className="pager" role="navigation" aria-label="Pagination">
      <div className="pager-left">
        <span className="pager-range">
          Showing <strong>{Math.min((page - 1) * pageSize + 1, totalItems)}</strong>–
          <strong>{Math.min(page * pageSize, totalItems)}</strong> of <strong>{totalItems}</strong>
        </span>

        <label className="pager-size" aria-label="Items per page">
          <span>Rows:</span>
          <select
            className="filter-select pager-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <ul className="pager-list">
        <li>
          <button
            className="pager-btn"
            aria-label="Previous page"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange(page - 1)}
          >
            ‹
          </button>
        </li>

        {!compact &&
          pages.map((p, i) =>
            p === "dots" ? (
              <li key={`dots-${i}`} className="pager-dots" aria-hidden="true">…</li>
            ) : (
              <li key={p}>
                <button
                  className={`pager-btn ${p === page ? "active" : ""}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
              </li>
            )
          )}

        <li>
          <button
            className="pager-btn"
            aria-label="Next page"
            disabled={!canNext}
            onClick={() => canNext && onPageChange(page + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}
