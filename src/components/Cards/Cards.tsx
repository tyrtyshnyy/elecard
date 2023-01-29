import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  LoadingSpinner,
  Pagination,
  ResetDeletedCards,
  Sorting
} from "../../components";
import useFetch from "../../hooks/useFetch";
import { CatalogResults } from "../../types";

import { Card } from "./Card/Card";
import styles from "./Cards.module.css";

const Cards: FC = () => {
  const { data, setData, isLoading, hasError } = useFetch<CatalogResults[]>(
    "http://contest.elecard.ru/frontend_data/catalog.json"
  );
  const [isSort, setIsSort] = useState(false);
  const [cards, setCards] = useState<CatalogResults[]>([]);

  // console.log(cards);
  useEffect(() => {
    setCards(data);
  }, []);

  useLayoutEffect(() => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );

    removeDB.forEach((img) => {
      setData((prev) => [...prev].filter((card) => card.image !== img));
      console.log("del");
    });
  }, []);
  console.log(cards);
  const handleCloseCard = useCallback((image: string) => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );

    setCards((prev) => [...prev].filter((card) => card.image !== image));

    localStorage.setItem("cards", JSON.stringify([...removeDB, image]));
  }, []);

  if (hasError || !data) {
    return <h2>Произошла ошибка, попробуйте позже</h2>;
  }

  return !isLoading ? (
    <>
      <div className={styles.cardsBlock}>
        <Sorting setCards={setData} setIsSort={setIsSort} />
      </div>

      <div className={styles.cards}>
        {cards.map(({ image, timestamp, filesize, category }) => (
          <Card
            key={image}
            image={image}
            timestamp={timestamp}
            handleCloseCard={handleCloseCard}
            filesize={filesize}
            category={category}
          />
        ))}
        <ResetDeletedCards />
      </div>
      <div className={styles.pagination}>
        <Pagination
          setSelectPage={setCards}
          cards={data}
          isSort={isSort}
          setIsSort={setIsSort}
        />
      </div>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default Cards;
