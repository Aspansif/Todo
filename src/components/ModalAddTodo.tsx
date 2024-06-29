import axios from "axios";
import React, { FC } from "react";
import { ITodo } from "../types/types";
import { useTodosStore } from "../StateManager/Store";

interface PropsModal {
  valueTitle: string;
  valueDescription: string;
  setAddTitle: (changeTitle: string) => void;
  setAddDescription: (changeDescription: string) => void;
  onAddModal: (isChange: boolean) => void;
}

const Modal: FC<PropsModal> = ({
  valueTitle,
  valueDescription,
  setAddTitle,
  setAddDescription,
  onAddModal,
}) => {
  const {
    addTodo,
    setAddTitle: setStoreAddTitle,
    setAddDescription: setStoreAddDescription,
  } = useTodosStore();

  function handleSave() {
    addTodo();
    setStoreAddTitle("");
    setStoreAddDescription("");
    onAddModal(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Добавление задачи</h1>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Название задачи
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={valueTitle}
            onChange={(e) => setAddTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Описание задачи
          </label>
          <textarea
            id="description"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={valueDescription}
            onChange={(e) => setAddDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Сохранить
          </button>
          <button
            onClick={() => onAddModal(false)}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
