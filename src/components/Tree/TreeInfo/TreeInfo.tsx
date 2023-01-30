import { FC, useState } from "react";
import { Modal } from "../../";
import { bytesToSize } from "../../../helpers/helpers";
import { CatalogResults } from "../../../types";

import styles from "./TreeInfo.module.css";

type TreeInfoProps = {
  treeData: CatalogResults[];
  item?: string;
};

const TreeInfo: FC<TreeInfoProps> = ({ treeData, item }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  //для оптимизации, чтобы не рендерить много порталов при первом рендере
  const [renderModal, setRenderModal] = useState(false);

  const infoFile = treeData.filter((data, index) => {
    if (
      data.image.slice(data.image.indexOf("/") + 1, data.image.indexOf("_")) ===
      item
    ) {
      return data;
    }
  });

  const name = infoFile[0].image.slice(
    infoFile[0].image.lastIndexOf("-") + 1,
    infoFile[0].image.indexOf("_")
  );
  const linkImg = `http://contest.elecard.ru/frontend_data/${infoFile[0].image}`;
  const date = new Date(infoFile[0].timestamp).toLocaleDateString();
  const fileSize = bytesToSize(infoFile[0].filesize);
  return (
    <>
      <div>
        <details onClick={() => setRenderModal(true)}>
          <summary>{item}</summary>
          <div className={styles.info}>
            <div
              onClick={() => setModalActive(true)}
              className={styles.infoImg}
            >
              <img src={linkImg} alt="photo" />
            </div>
            <div className={styles.infoFile}>
              <p>{date}</p>
              <p>{fileSize}</p>
              <p>{name}</p>
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

