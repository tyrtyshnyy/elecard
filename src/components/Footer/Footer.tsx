import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made By{" "}
      <a className={styles.footerName} target="_blank" href="https://github.com/tyrtyshnyy">
        Sergey
      </a>
    </footer>
  );
};

export default Footer;
