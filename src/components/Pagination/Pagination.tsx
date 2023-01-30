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
      {pages.map((page, index) => (
        <span
          className={currentPage === page ? styles.pageCurrent : styles.page}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
