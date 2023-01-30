import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { CatalogResults } from "../../types";
import styles from "./Sorting.module.css";
const sort = [
  { id: 1, item: "Категории" },
  { id: 2, item: "Дате" },
  { id: 3, item: "Названию" },
  { id: 4, item: "Размеру" },
];
type SortingProps = {
  setCards: Dispatch<SetStateAction<CatalogResults[]>>;
  handleIsSort: (state: boolean) => void;
};
const Sorting: FC<SortingProps> = ({ setCards, handleIsSort }) => {
  const [activeRadio, setActiveRadio] = useState<number>(1);

  const sortByCategory = () => {
    setCards((prev) =>
      [...prev].sort((a, b) => a.category.localeCompare(b.category))
    );
  };

  const sortByTimestamp = () => {
    setCards((prev) => [...prev].sort((a, b) => a.timestamp - b.timestamp));
  };

  const sortByName = () => {
    setCards((prev) =>
      [...prev].sort((a, b) => {
        return a.image
          .slice(a.image.indexOf("/"))
          .localeCompare(b.image.slice(b.image.lastIndexOf("/")));
      })
    );
  };

  const sortBySize = () => {
    setCards((prev) => [...prev].sort((a, b) => a.filesize - b.filesize));
  };

  useEffect(() => {
    switch (activeRadio) {
      case 1:
        sortByCategory();
        handleIsSort(true);
        break;
      case 2:
        sortByTimestamp();
        handleIsSort(true);
        break;
      case 3:
        sortByName();
        handleIsSort(true);
        break;

      case 4:
        sortBySize();
        handleIsSort(true);
        break;
      default:
        break;
    }
  }, [activeRadio]);

  return (
    <div className={styles.sorting}>
      <h3 className={styles.sortingTitle}>Сортировка по:</h3>
      <div>
        {sort.map((el) => {
          return (
            <label key={el.id} className={styles.sortingLabel}>
              <input
                type="radio"
                checked={el.id === activeRadio}
                onChange={() => setActiveRadio(el.id)}
              />
              {el.item}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Sorting;
