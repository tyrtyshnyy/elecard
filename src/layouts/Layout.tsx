import { FC, ReactNode } from "react";
import { Footer, Header } from "../components";
import styles from "./Layout.module.css";
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

