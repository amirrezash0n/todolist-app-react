import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import type { Todo } from "../types/types";

interface FormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// components/Form.tsx
export default function Form({ todos, setTodos }: FormProps) {
  const [input, setInput] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, { name: input, completed: false, id: uuid() }]);
      setInput("");
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <input
          className="form-input"
          type="text"
          placeholder="Enter A Todo"
          autoComplete="off"
          value={input}
          onChange={handleInputChange}
        />
        <button className="form-button" type="submit" disabled={!input.trim()}>
          Add
        </button>
      </form>
    </div>
  );
}
