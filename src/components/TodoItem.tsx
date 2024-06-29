import React, { FC, useEffect } from "react";
import { ITodo } from "../types/types";

interface todoProps {
  todo: ITodo;
  deleteTodo: (id: number) => void;
  toggleTodoStatus: (id: number, status: string) => void;
}

const TodoItem: FC<todoProps> = ({ todo, deleteTodo, toggleTodoStatus }) => {
  return (
    <div key={todo.id} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{todo.attributes.title}</h2>
      <p className="text-gray-700">{todo.attributes.description}</p>
      <div className="flex items-center justify-between mt-4">
        <select
          value={todo.attributes.status}
          onChange={(e) => toggleTodoStatus(todo.id, e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="Не выполнено">Не выполнено</option>
          <option value="Выполнено">Выполнено</option>
          <option value="Избранное">Избранное</option>
        </select>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
