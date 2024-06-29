import axios from "axios";
import { ITodo } from "../types/types";
import { useTodosStore } from "../StateManager/Store";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

describe("useTodosStore", () => {
  let store: any;

  beforeEach(() => {
    store = useTodosStore;
    store.setState({
      todos: [],
      selectedSort: "",
      addModal: false,
      addTitle: "",
      addDescription: "",
      page: 1,
      hasMore: true,
      totalCount: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch todos", async () => {
    const mockTodos: ITodo[] = [
      {
        id: 1,
        attributes: {
          title: "Todo 1",
          description: "Description 1",
          status: "Не выполнено",
          createdAt: "2023-04-01",
          updatedAt: "2023-04-01",
          publishedAt: "2023-04-01",
        },
      },
      {
        id: 2,
        attributes: {
          title: "Todo 2",
          description: "Description 2",
          status: "Не выполнено",
          createdAt: "2023-04-02",
          updatedAt: "2023-04-02",
          publishedAt: "2023-04-02",
        },
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: mockTodos,
        meta: { pagination: { total: 2 } },
      },
    });

    await store.getState().fetchTodos();

    expect(store.getState().todos).toEqual(mockTodos);
    expect(store.getState().totalCount).toBe(2);
    expect(store.getState().hasMore).toBe(false);
  });

  it("should add a todo", async () => {
    const newTodo: ITodo = {
      id: 3,
      attributes: {
        title: "New Todo",
        description: "New Description",
        status: "Не выполнено",
        createdAt: "2023-04-03",
        updatedAt: "2023-04-03",
        publishedAt: "2023-04-03",
      },
    };
    mockedAxios.post.mockResolvedValueOnce({
      data: { data: newTodo },
    });

    store.getState().setAddTitle("New Todo");
    store.getState().setAddDescription("New Description");
    await store.getState().addTodo();

    expect(store.getState().todos).toContainEqual(newTodo);
    expect(store.getState().addTitle).toBe("");
    expect(store.getState().addDescription).toBe("");
  });

  it("should delete a todo", async () => {
    const todos: ITodo[] = [
      {
        id: 1,
        attributes: {
          title: "Todo 1",
          description: "Description 1",
          status: "Не выполнено",
          createdAt: "2023-04-01",
          updatedAt: "2023-04-01",
          publishedAt: "2023-04-01",
        },
      },
      {
        id: 2,
        attributes: {
          title: "Todo 2",
          description: "Description 2",
          status: "Не выполнено",
          createdAt: "2023-04-02",
          updatedAt: "2023-04-02",
          publishedAt: "2023-04-02",
        },
      },
    ];
    store.getState().setTodos(todos);

    mockedAxios.delete.mockResolvedValueOnce({});

    await store.getState().deleteTodo(1);

    expect(store.getState().todos).not.toContainEqual(todos[0]);
  });

  it("should set add modal", () => {
    store.getState().setAddModal(true);
    expect(store.getState().addModal).toBe(true);
  });

  it("should set selected sort", () => {
    store.getState().setSelectedSort("title");
    expect(store.getState().selectedSort).toBe("title");
  });
});
