import { FC, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { CatalogResults } from "../../types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CardsData } from "./CardsData/CardsData";

type LocalStorageProps = {
  data: CatalogResults[];
};
const LocalStorage: FC<LocalStorageProps> = ({ data }) => {
  const [filteredCards, setFilteredCards] = useState<CatalogResults[]>(data);
  const [removeCard, setRemoveCard] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Карточки";

    const removeDB: string[] = JSON.parse(
      window.localStorage.getItem("cards") || "[]"
    );
    if (removeDB) {
      setRemoveCard(removeDB);
      removeDB.forEach((img) => {
        setFilteredCards((prev) =>
          [...prev].filter((card) => {
            return card.image !== img;
          })
        );
      });
    }
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <CardsData
      cards={filteredCards}
      setCards={setFilteredCards}
      removeCard={removeCard}
      setRemoveCard={setRemoveCard}
    />
  ) : (
    <LoadingSpinner />
  );
};

const Cards: FC = () => {
  const { data, isLoading, hasError } = useFetch<CatalogResults[]>(
    "http://contest.elecard.ru/frontend_data/catalog.json"
  );

  if (hasError) {
    return <h2>Произошла ошибка, попробуйте позже</h2>;
  }
  return !isLoading ? <LocalStorage data={data} /> : <LoadingSpinner />;
};

export default Cards;
