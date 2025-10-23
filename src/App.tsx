import { useState } from "react";
import Form from "./components/Form";
import type { Todo } from "./types/types";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <div className="App">
      <div className="header">
        <h1>Todolist-App</h1>
        <div>
          <Form todos={todos} setTodos={setTodos} />
        </div>
        <div>
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
