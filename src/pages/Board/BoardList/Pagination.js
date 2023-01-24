import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <nav className={styles.nav}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              className={styles.pageBtn}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </nav>
    </>
  );
};

export default Pagination;
