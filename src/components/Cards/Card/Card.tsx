import { FC } from "react";
import styles from "./Card.module.css";

type CardProps = {
  imageLink: string;
  timestamp: number;
  handleCloseCard: (image: string) => void
};
const Card: FC<CardProps> = ({ imageLink, timestamp, handleCloseCard }) => {
  const date = new Date(timestamp).toLocaleDateString()

  return (
    <div className={styles.card}>
      <button
        onClick={() => handleCloseCard(imageLink)}
        className={styles.cardClose}
      ></button>
      <div className={styles.cardImage}>
        <img
          src={`http://contest.elecard.ru/frontend_data/${imageLink}`}
          alt="image"
        />
      </div>
      <h3 className={styles.cardDate}>{date}</h3>
    </div>
  );
};

export { Card };

