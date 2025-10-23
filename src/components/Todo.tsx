import React, { useState } from "react";
import type { Todo } from "../types/types";

interface TodoProps {
  todo: Todo;
  todos: Todo[];
  id: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function Todo({ todo, todos, id, setTodos }: TodoProps) {
  const [edit, setEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState(todo.name);

  function onchangesave(e: React.ChangeEvent<HTMLInputElement>) {
    setInputEdit(e.target.value);
  }

  function handleEdit() {
    setEdit(true);
    setInputEdit(todo.name); // Reset to current value when editing starts
  }

  function handleSave() {
    setEdit(false);
    if (inputEdit.trim()) {
      saveInput(inputEdit.trim());
    } else {
      setInputEdit(todo.name); // Reset if input is empty
    }
  }

  function handleCancel() {
    setEdit(false);
    setInputEdit(todo.name); // Reset to original value
  }

  function handleDelete() {
    setTodos(todos.filter((item) => item.id !== id));
  }

  function handleComplete() {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  function saveInput(newName: string) {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        return item;
      })
    );
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

  if (edit) {
    return (
      <div className="todo-li">
        <li className="li-list editing">
          <input
            className="li-input edit-input"
            value={inputEdit}
            onChange={onchangesave}
            onKeyDown={handleKeyPress}
            autoFocus
          />

          <button
            className="button-save"
            onClick={handleSave}
            disabled={!inputEdit.trim()}
          >
            <span className="text-save">Save</span>
            <i className="fa fa-save"></i>
          </button>

          <button className="button-cancel" onClick={handleCancel}>
            <span className="text-cancel">Cancel</span>
            <i className="fa fa-x"></i>
          </button>
        </li>
      </div>
    );
  }

  return (
    <div className="todo-li">
      <li className={`li-list ${todo.completed ? "completed" : ""}`}>
        <input className="li-input" value={todo.name} readOnly />

        <button
          className={`button-complete ${todo.completed ? "completed" : ""}`}
          onClick={handleComplete}
        >
          <span className="text-complete">
            {todo.completed ? "Undo" : "Complete"}
          </span>
          <i className={`fa ${todo.completed ? "fa-undo" : "fa-check"}`}></i>
        </button>

        <button
          className="button-edit"
          onClick={handleEdit}
          disabled={todo.completed}
        >
          <span className="text-edit">Edit</span>
          <i className="fa fa-edit"></i>
        </button>

        <button className="button-delete" onClick={handleDelete}>
          <span className="text-delete">Delete</span>
          <i className="fa fa-trash"></i>
        </button>
      </li>
    </div>
  );
}
