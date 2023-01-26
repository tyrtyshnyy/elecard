import { FC } from "react";
import { bytesToSize } from "../../../helpers/helpers";
import { CatalogResults } from "../../../types";
import styles from "./Card.module.css";

type CardProps = {
  handleCloseCard: (image: string) => void;
};
const Card: FC<CatalogResults & CardProps> = ({
  image,
  timestamp,
  handleCloseCard,
  category,
  filesize,
}) => {
  const date: string = timestamp ? new Date(timestamp).toLocaleDateString() : "";

  return (
    <div className={styles.card}>
      <button
        onClick={() => handleCloseCard(image)}
        className={styles.cardClose}
      ></button>
      <div className={styles.cardImage}>
        <img
          src={`http://contest.elecard.ru/frontend_data/${image}`}
          alt="image"
        />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardCategory}>{category}</h3>
        <div className={styles.cardDateSize}>
          <p>{date}</p>
          <p>{bytesToSize(filesize)}</p>
        </div>
      </div>
    </div>
  );
};

export { Card };

