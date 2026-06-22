const API_BASE = `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:8000/api`;

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_BASE}/todos/`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(data: { title: string; description?: string }): Promise<Todo> {
  const res = await fetch(`${API_BASE}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id: string, data: { title?: string; description?: string; done?: boolean }): Promise<Todo> {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}
