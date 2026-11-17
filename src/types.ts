export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "normal" | "high";
  date: string;
}

export type SortOrder = "none" | "asc" | "desc";