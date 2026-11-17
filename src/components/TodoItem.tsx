import type { Todo } from "../types/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span onClick={() => onToggle(todo.id)}>
        {todo.text}
      </span>

      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        title="Видалити задачу"
      >
        Видалити
      </button>
    </div>
  );
};

export default TodoItem;
