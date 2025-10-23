import Todo from "./Todo";
import type { Todo as TodoTypes } from "../types/types";

interface TodoListProps {
  todos: TodoTypes[];
  setTodos: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  return (
    <div className="todo-ul">
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </div>
  );
}
