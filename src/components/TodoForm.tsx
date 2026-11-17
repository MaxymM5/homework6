import styles from "./TodoForm.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import type { SortOrder, Todo } from "../types";

interface TodoFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (text: string, priority: Todo["priority"], date: string) => void;
  onToggleSort: () => void;
  sortOrder: SortOrder;
}

const TodoForm = ({
  inputValue,
  onInputChange,
  onAdd,
  onToggleSort,
  sortOrder,
}: TodoFormProps) => {
  const [priority, setPriority] = useState<Todo["priority"]>("normal");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    onAdd(inputValue, priority, date);
    setDate("");
    setPriority("normal");
  };

  const sortLabel =
    sortOrder === "asc"
      ? "Сортування: А-Я"
      : sortOrder === "desc"
      ? "Сортування: Я-А"
      : "Сортувати";

  
return (
  <form className={styles.form} onSubmit={handleSubmit}>
    <input
      className={styles.input}
      type="text"
      id="todo-input"
      placeholder="Що потрібно зробити?"
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      autoComplete="off"
    />

    <select
      className={styles.select}
      value={priority}
      onChange={(e) =>
        setPriority(e.target.value as Todo["priority"])
      }
    >
      <option value="low">Низький пріоритет</option>
      <option value="normal">Звичайний пріоритет</option>
      <option value="high">Високий пріоритет</option>
    </select>

    <input
      className={styles.input}
      type="datetime-local"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <div className={styles.buttons}>
      <button type="submit" id="add-button" className={styles.addButton}>
        Додати
      </button>

      <button
        type="button"
        id="sort-button"
        className={styles.sortButton}
        onClick={onToggleSort}
      >
        {sortLabel}
      </button>
    </div>
  </form>
);
};

export default TodoForm;
