import { FC } from "react";
import { bytesToSize } from "../../../helpers/helpers";
import { CatalogResults } from "../../../types";
import { CloseButton } from "./../../";
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
  const date: string = timestamp
    ? new Date(timestamp).toLocaleDateString()
    : "";
  const name = image.slice(image.indexOf("/") + 1, image.lastIndexOf("-"));
  return (
    <div className={styles.card}>
      <CloseButton
        onClick={() => handleCloseCard(image)}
        className={styles.cardClose}
      />
      <div className={styles.cardImage}>
        <img
          src={`http://contest.elecard.ru/frontend_data/${image}`}
          alt="image"
        />
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardCategory}>{category}</h3>
        {name}
        <div className={styles.cardDateSize}>
          <p>{date}</p>
          <p>{bytesToSize(filesize)}</p>
        </div>
      </div>
    </div>
  );
};

export { Card };

