import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { createPages, Paginator } from "../../helpers/helpers";
import { CatalogResults } from "../../types";

import styles from "./Pagination.module.css";

type PaginationProps = {
  cards: CatalogResults[];
  setSelectPage: Dispatch<SetStateAction<CatalogResults[]>>;
  isSort: boolean;
  handleIsSort: (state: boolean) => void;
};

const Pagination: FC<PaginationProps> = ({
  cards,
  setSelectPage,
  isSort,
  handleIsSort,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 660;
  const pagesCount = Math.ceil(totalCount / 20);
  const pages: number[] = [];
  createPages(pages, pagesCount, currentPage);


  useEffect(() => {
    const { data } = Paginator<CatalogResults>(cards, 20);
    setSelectPage(data[currentPage - 1]);
    handleIsSort(false);
  }, [currentPage, isSort]);

  return (
    <div className={styles.pages}>
      <span className={styles.page} onClick={() => setCurrentPage(1)}>
        &lt;&lt;
      </span>
      <span
        className={styles.page}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        &lt;
      </span>
      {pages.map((page, index) => (
        <span
          className={currentPage === page ? styles.pageCurrent : styles.page}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      ))}
      <span
        className={styles.page}
        onClick={() =>
          setCurrentPage((prev) =>
            pages[pages.length - 1] > prev ? prev + 1 : prev
          )
        }
      >
        &gt;
      </span>
      <span className={styles.page} onClick={() => setCurrentPage(pagesCount)}>
        &gt;&gt;
      </span>
    </div>
  );
};

export default Pagination;
