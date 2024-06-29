import React from "react";
import { ITodo } from "../types/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: ITodo[];
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number, status: string) => void;
  onAddModal: (isChange: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodoStatus,
  onAddModal,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <button
        className="mx-auto p-3 bg-green-500 hover:bg-green-600 rounded-sm w-96"
        onClick={() => onAddModal(true)}
      >
        Добавить задачу
      </button>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodoStatus={toggleTodoStatus}
        ></TodoItem>
      ))}
    </div>
  );
};

export default TodoList;
