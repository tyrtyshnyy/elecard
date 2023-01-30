import { FC, useEffect, useState } from "react";
import styles from "./ResetDeletedCards.module.css";

type ResetDeletedCardsProps = {
  removeCard: string[];
};

const ResetDeletedCards: FC<ResetDeletedCardsProps> = ({ removeCard }) => {
  const [removeDB, setRemoveDB] = useState<string[]>([]);
  useEffect(() => {
    setRemoveDB((prev) => [...prev, ...removeCard]);
  }, [removeCard]);

  useEffect(() => {
    const removeLS: string[] = JSON.parse(
      localStorage.getItem("cards") || "[]"
    );
    setRemoveDB(removeLS);
  }, []);

  const resetCards = () => {
    localStorage.removeItem("cards");
    window.location.reload();
  };

  return removeDB.length > 0 ? (
    <div className={styles.reset}>
      <button onClick={resetCards}>Сбросить</button>
    </div>
  ) : (
    <></>
  );
};

export default ResetDeletedCards;
