import type { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const isOverdue =
    !todo.completed &&
    !!todo.date &&
    new Date(todo.date) < new Date();

  const priorityLabel = {
    low: "Низький",
    normal: "Звичайний",
    high: "Високий",
  };

  const priorityBadge = {
    low: styles.badgeLow,
    normal: styles.badgeNormal,
    high: styles.badgeHigh,
  };

  return (
    <div
      className={`${styles.item} ${styles[todo.priority]} ${
        todo.completed ? styles.completed : ""
      } ${isOverdue ? styles.overdue : ""}`}
    >
      <div className={styles.todoContent}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className={styles.text}>
          {todo.text}
        </span>
      </div>

      <div className={styles.details}>
        <span className={`${styles.badge} ${priorityBadge[todo.priority]}`}>
          {priorityLabel[todo.priority]}
        </span>

        {todo.date && (
          <span className={styles.date}>
            Дедлайн: {new Date(todo.date).toLocaleString("uk-UA")}
          </span>
        )}

        {isOverdue && (
          <span className={styles.overdueBadge}>
            Прострочено!
          </span>
        )}
      </div>

      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        title="Видалити задачу"
      >
        Видалити
      </button>
    </div>
  );
};

export default TodoItem;
