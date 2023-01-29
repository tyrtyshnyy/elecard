import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./CloseButton.module.css";

interface CloseButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void;
  className: string;
}

const CloseButton: FC<CloseButtonProps> = (props) => {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={`${props.className} ${styles.closeButton}`}
    />
  );
};

export default CloseButton;
