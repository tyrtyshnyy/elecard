import { FC, useLayoutEffect } from "react";
import { LoadingSpinner, ResetDeletedCards, Sorting } from "../../components";
import useFetch from "../../hooks/useFetch";
import { CatalogResults } from "../../types";

import { Card } from "./Card/Card";
import styles from "./Cards.module.css";


const Cards: FC = () => {
  const { data, setData, isLoading, hasError } = useFetch<CatalogResults[]>(
    "http://contest.elecard.ru/frontend_data/catalog.json"
  );

  useLayoutEffect(() => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );
    removeDB.forEach((img) =>
    setData((prev) => [...prev].filter((card) => card.image !== img))
    );
  }, []);

  const handleCloseCard = (image: string) => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );
    setData((prev) => [...prev].filter((card) => card.image !== image));

    localStorage.setItem("cards", JSON.stringify([...removeDB, image]));
  };

  if(hasError) {
    return <h2>Произошла ошибка, попробуйте позже</h2>
  }

  return !isLoading ? (
    <>
      <Sorting setCards={setData}/>
      <div className={styles.cards}>
        {data.map(({ image, timestamp, filesize, category }) => (
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
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default Cards;
