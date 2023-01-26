import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";
import { CatalogResults } from "../../types";
import styles from "./Sorting.module.css";
const sort = [
  { id: 1, item: "Категории" },
  { id: 2, item: "Дате" },
  { id: 3, item: "Названию файла" },
  { id: 4, item: "Размеру файла" },
];
type SortingProps = {
  setCards: Dispatch<SetStateAction<CatalogResults[]>>;
};
const Sorting: FC<SortingProps> = ({ setCards }) => {
  const [activeRadio, setActiveRadio] = useState<number>(1);

  const sortByCategory = useCallback(() => {
    setCards((prev) =>
      [...prev].sort((a, b) => a.category.localeCompare(b.category))
    );
  }, []);

  const sortByTimestamp = useCallback(() => {
    setCards((prev) => [...prev].sort((a, b) => a.timestamp - b.timestamp));
  }, []);

  const sortByName = useCallback(() => {}, []);

  const sortBySize = useCallback(() => {
    setCards((prev) => [...prev].sort((a, b) => a.filesize - b.filesize));
  }, []);

  useEffect(() => {
    switch (activeRadio) {
      case 1:
        sortByCategory();
        break;
      case 2:
        sortByTimestamp();
        break;
      case 3:
        sortByName();
        break;

      case 4:
        sortBySize();
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
