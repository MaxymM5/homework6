import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo List</h1>
      <p className={styles.subtitle}>
        Організуй свої щоденні справи та завдання
      </p>
    </header>
  );
};

export default Header;