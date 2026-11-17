import type { Todo } from "../types";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <div id="todo-list" className={styles.list}>
      {todos.length === 0 ? (
        <p className={styles.empty}>Поки що завдань немає</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
