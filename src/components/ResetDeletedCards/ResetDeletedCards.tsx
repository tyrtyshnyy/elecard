import styles from "./ResetDeletedCards.module.css";

const ResetDeletedCards = () => {
  const removeDB: string[] = JSON.parse(localStorage.getItem("cards") || "[]");
  
  const resetCards = () => {
    localStorage.removeItem("cards");
    window.location.reload();
  };

  return (
    removeDB.length > 0 ? (
      <div className={styles.reset}>
        <button onClick={resetCards}>Сбросить</button>
      </div>
    ) : <></>
  );
};

export default ResetDeletedCards;
