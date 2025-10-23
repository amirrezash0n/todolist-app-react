import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import type { Todo } from "../types/types";

interface FormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function Form({ todos, setTodos }: FormProps) {
  const [input, setInput] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTodos([...todos, { name: input, completed: false, id: uuid() }]);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="enter a todos"
        autoComplete="off"
        value={input}
        onChange={handleInputChange}
      />
      <button className="form-button" type="submit">
        Add
      </button>
    </form>
  );
}
