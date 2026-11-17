import styles from "./App.module.css";
import Header from "./components/Header";
import Counter from "./components/Counter";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import type { Todo, SortOrder } from "./types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");

    if (!saved) return [];

    return JSON.parse(saved).map((todo: Todo) => ({
      ...todo,
      priority: todo.priority ?? "normal",
      date: todo.date ?? "",
    }));
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;

  const displayedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "asc") return a.text.localeCompare(b.text);
    if (sortOrder === "desc") return b.text.localeCompare(a.text);
    return 0;
  });

  useEffect(() => {
    document.title = `Задач: ${totalCount} | Todo App`;
  }, [totalCount]);

  const handleAddTodo = (
    text: string,
    priority: Todo["priority"],
    date: string
  ): void => {
    const trimmed = text.trim();

    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      priority,
      date,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (id: number): void => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTodo = (id: number): void => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleToggleSort = (): void => {
    setSortOrder((prev) => {
      if (prev === "none") return "asc";
      if (prev === "asc") return "desc";
      return "none";
    });
  };

  return (
    <main className={styles.app}>
      <Header />

      <TodoForm
        inputValue={inputValue}
        onInputChange={setInputValue}
        onAdd={handleAddTodo}
        onToggleSort={handleToggleSort}
        sortOrder={sortOrder}
      />

      <Counter
        totalCount={totalCount}
        completedCount={completedCount}
      />

      <TodoList
        todos={displayedTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </main>
  );
};

export default App;
