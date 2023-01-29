import { Dispatch, FC, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { CloseButton } from '../';
import styles from "./Modal.module.css";

type ModalProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  linkImg: string;
};

const Modal: FC<ModalProps> = ({ active, setActive, linkImg }) => {
  return createPortal(
    <div
      className={`${styles.modal} ${active ? styles.modalActive : ""}`}
      onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={() => setActive(false)}
          className={styles.modalClose}
        />
        <img src={linkImg} alt="photo" />
      </div>
    </div>,
    document.body
  );
};

export default Modal;
