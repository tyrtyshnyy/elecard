import { FC, useState } from "react";
import { Modal } from "../../";
import { CatalogResults } from "../../../types";

import styles from "./TreeInfo.module.css";

type TreeInfoProps = {
  data: CatalogResults;
};

const TreeInfo: FC<TreeInfoProps> = ({ data }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  //для оптимизации, чтобы не рендерить много порталов при первом рендере
  const [renderModal, setRenderModal] = useState(false);

  const name = data.image.slice(
    data.image.lastIndexOf("-") + 1,
    data.image.indexOf("_")
  );
  const linkImg = `http://contest.elecard.ru/frontend_data/${data.image}`;

  return (
    <>
      <div>
        <details onClick={() => setRenderModal(true)}>
          <summary>{name}</summary>
          <div className={styles.info}>
            <div
              onClick={() => setModalActive(true)}
              className={styles.infoImg}
            >
              <img src={linkImg} alt="photo" />
            </div>
          </div>
        </details>
      </div>
      {renderModal && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          linkImg={linkImg}
        />
      )}
    </>
  );
};

export { TreeInfo };

