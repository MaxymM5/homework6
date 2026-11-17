import styles from "./Counter.module.css";

interface CounterProps {
  totalCount: number;
  completedCount: number;
}

const Counter = ({ totalCount, completedCount }: CounterProps) => {
  return (
    <div className={styles.counter}>
      <div className={styles.counterItem}>
        <span>Усього завдань</span>
        <strong>{totalCount}</strong>
      </div>

      <div className={styles.counterItem}>
        <span>Виконано</span>
        <strong>{completedCount}</strong>
      </div>
    </div>
  );
};

export default Counter;
