import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Pagination, ResetDeletedCards, Sorting } from "../..";
import { CatalogResults } from "../../../types";

import { Card } from "../Card/Card";
import styles from "./CardsData.module.css";

type CardsDataProps = {
  cards: CatalogResults[];
  setCards: Dispatch<SetStateAction<CatalogResults[]>>;
  removeCard: string[];
  setRemoveCard: Dispatch<SetStateAction<string[]>>;
};
const CardsData: FC<CardsDataProps> = ({
  cards,
  setCards,
  removeCard,
  setRemoveCard,
}) => {
  const [isSort, setIsSort] = useState(false);
  const [cardsForPagination, setCardsForPagination] = useState<
    CatalogResults[]
  >([]);

  useEffect(() => {
    if (removeCard.length > 0) {
      window.localStorage.setItem("cards", JSON.stringify(removeCard));
    }
  }, [removeCard]);

  const handleCloseCard = (image: string) => {
    setRemoveCard((prev) => [...prev, image]);
    setCardsForPagination((prev) =>
      [...prev].filter((card) => card.image !== image)
    );
    setCards((prev) => [...prev].filter((card) => card.image !== image));
  };

  const handleIsSort = (state: boolean) => {
    setIsSort(state);
  };
  return (
    <>
      <div className={styles.cardsBlock}>
        <Sorting setCards={setCards} handleIsSort={handleIsSort} />
      </div>

      <div className={styles.cards}>
        {cardsForPagination.map(({ image, timestamp, filesize, category }) => (
          <Card
            key={image}
            image={image}
            timestamp={timestamp}
            handleCloseCard={handleCloseCard}
            filesize={filesize}
            category={category}
          />
        ))}
        <ResetDeletedCards removeCard={removeCard} />
      </div>
      <div className={styles.pagination}>
        <Pagination
          setSelectPage={setCardsForPagination}
          cards={cards}
          isSort={isSort}
          handleIsSort={handleIsSort}
        />
      </div>
    </>
  );
};

export { CardsData };

