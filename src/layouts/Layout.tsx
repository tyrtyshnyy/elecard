import { FC, ReactNode } from "react";
import { Footer, Header } from "../components";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

