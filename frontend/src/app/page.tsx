"use client";

import { useEffect, useState, useOptimistic, startTransition } from "react";
import type { Todo } from "@/lib/api";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/lib/api";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const todo = await createTodo({ title, description });
    setTodos((prev) => [todo, ...prev]);
    setTitle("");
    setDescription("");
  }

  async function handleToggle(todo: Todo) {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
    );
    await updateTodo(todo.id, { done: !todo.done });
  }

  async function handleDelete(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    await deleteTodo(id);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>

      <form onSubmit={handleAdd} className="flex flex-col gap-2 mb-6">
        <input
          className="border rounded px-3 py-2"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800"
        >
          Add Todo
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 border rounded px-4 py-3"
            >
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo)}
                className="size-5"
              />
              <div className="flex-1">
                <span
                  className={todo.done ? "line-through text-gray-400" : ""}
                >
                  {todo.title}
                </span>
                {todo.description && (
                  <p className="text-sm text-gray-500">{todo.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
