import React, { FC, useEffect, useMemo } from "react";
import TodoList from "./components/TodoList";
import Sorted from "./components/Sorted";
import Modal from "./components/ModalAddTodo";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTodosStore } from "./StateManager/Store";
import axios from "axios";

const App: FC = () => {
  const {
    fetchTodos,
    // fetchMoreTodos,
    todos,
    selectedSort,
    addModal,
    setAddModal,
    addTodo,
    deleteTodo,
    addTitle,
    setAddTitle,
    addDescription,
    setAddDescription,
    setSelectedSort,
    setTodos,
    hasMore,
  } = useTodosStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  const sortedTodos = useMemo(() => {
    if (selectedSort) {
      return todos.filter((todo) => todo.attributes.status === selectedSort);
    }
    return todos;
  }, [selectedSort, todos]);

  async function toggleTodoStatus(id: number, status: string) {
    try {
      const { data } = await axios.put<any>(
        `https://cms.dev-land.host/api/tasks/${id}`,
        {
          data: { status },
        }
      );

      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                attributes: {
                  ...todo.attributes,
                  status: data.data.attributes.status,
                },
              }
            : todo
        )
      );
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      {addModal && (
        <Modal
          valueTitle={addTitle}
          valueDescription={addDescription}
          setAddTitle={setAddTitle}
          setAddDescription={setAddDescription}
          onAddModal={setAddModal}
        />
      )}
      <h1 className="text-3xl font-bold mb-5">TodoList</h1>
      <Sorted
        value={selectedSort}
        onChange={setSelectedSort}
        defaultValue={"Сортировка по"}
        options={[
          { value: "", name: "Все" },
          { value: "Выполнено", name: "Выполненые" },
          { value: "Не выполнено", name: "Не выполненые" },
          { value: "Избранное", name: "Избранные" },
        ]}
      />
      {/* <InfiniteScroll
        dataLength={sortedTodos.length}
        next={fetchMoreTodos}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>Все задачи загружены</p>}
      > */}
      <TodoList
        onAddModal={setAddModal}
        deleteTodo={deleteTodo}
        toggleTodoStatus={toggleTodoStatus}
        todos={sortedTodos}
      />
      {/* </InfiniteScroll> */}
    </>
  );
};

export default App;
