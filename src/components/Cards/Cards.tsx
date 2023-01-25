import { FC, useLayoutEffect, useState } from "react";
import { CatalogResults } from "../../api/types";
import ResetDeletedCards from "../ResetDeletedCards/ResetDeletedCards";
import { Card } from "./Card/Card";
import styles from "./Cards.module.css";

type CardsProps = {
  catalog: CatalogResults[];
};

const Cards: FC<CardsProps> = ({ catalog }) => {
  const [cards, setCards] = useState<CatalogResults[]>(catalog);

  useLayoutEffect(() => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );
    removeDB.forEach((img) =>
      setCards((prev) => prev.filter((card) => card.image !== img))
    );
  }, []);

  const handleCloseCard = (image: string) => {
    const removeDB: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );
    setCards((prev) => prev.filter((card) => card.image !== image));

    localStorage.setItem("cards", JSON.stringify([...removeDB, image]));
  };

  // обработка ошибки
  // подумать про ленивую обработку загрузки фото при скроле
  //функцию прокидываем в card и вызываем ее при клике на крестик ez
  console.log();

  return (
    <>
      <ResetDeletedCards />
      <div className={styles.cards}>
        {cards.map(({ image, timestamp }) => (
          <Card
            key={image}
            imageLink={image}
            timestamp={timestamp}
            handleCloseCard={handleCloseCard}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;
