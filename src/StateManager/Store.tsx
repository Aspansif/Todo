import axios from "axios";
import { create } from "zustand";
import { ITodo } from "../types/types";

interface TodosState {
  todos: ITodo[];
  selectedSort: string;
  addModal: boolean;
  addTitle: string;
  addDescription: string;
  page: number;
  hasMore: boolean;
  totalCount: number;
  fetchTodos: () => Promise<void>;
  // fetchMoreTodos: () => Promise<void>;
  addTodo: () => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setTodos: (todos: ITodo[]) => void;
  setAddModal: (value: boolean) => void;
  setAddTitle: (title: string) => void;
  setAddDescription: (description: string) => void;
  setSelectedSort: (sort: string) => void;
}

export const useTodosStore = create<TodosState>((set, get) => ({
  todos: [],
  selectedSort: "",
  addModal: false,
  addTitle: "",
  addDescription: "",
  page: 1,
  hasMore: true,
  totalCount: 0,
  fetchTodos: async () => {
    try {
      const { data } = await axios.get<{
        data: ITodo[];
        meta: { pagination: { total: number } };
      }>("https://cms.dev-land.host/api/tasks");
      set({
        todos: data.data,
        page: 1,
        totalCount: data.meta.pagination.total,
        hasMore: data.data.length === 10,
      });
    } catch (e) {
      alert(e);
    }
  },
  // fetchMoreTodos: async () => {
  //   const { page, todos } = get();
  //   try {
  //     const { data } = await axios.get<{
  //       data: ITodo[];
  //       meta: { pagination: { total: number } };
  //     }>(
  //       `http://localhost:1337/api/tasks?pagination%5Bpage%5D=${
  //         page + 1
  //       }&pagination%5BpageSize%5D=10`
  //     );
  //     set((state) => ({
  //       todos: [...state.todos, ...data.data],
  //       page: state.page + 1,
  //       hasMore: (state.page + 1) * 10 < data.meta.pagination.total,
  //     }));
  //   } catch (e) {
  //     alert(e);
  //   }
  // },
  addTodo: async () => {
    const { addTitle, addDescription, todos } = get();
    try {
      const { data } = await axios.post<{ data: ITodo }>(
        "http://localhost:1337/api/tasks",
        {
          data: {
            title: addTitle,
            description: addDescription,
            status: "Не выполнено",
          },
        }
      );
      set(() => ({
        todos: [...todos, data.data],
        addTitle: "",
        addDescription: "",
      }));
    } catch (e) {
      console.log(e);
    }
  },
  deleteTodo: async (id: number) => {
    const { todos } = get();

    set(() => ({
      todos: todos.filter((todo) => todo.id !== id),
    }));

    try {
      await axios.delete<any>(`http://localhost:1337/api/tasks/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
  setTodos: (todos: ITodo[]) => set({ todos }),
  setAddModal: (value: boolean) => set({ addModal: value }),
  setSelectedSort: (sort: string) => set({ selectedSort: sort }),
  setAddTitle: (title: string) => set({ addTitle: title }),
  setAddDescription: (description: string) =>
    set({ addDescription: description }),
}));
