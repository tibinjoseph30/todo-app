import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodos = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: todo }]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };
  return (
    <>
      <AddTodo todo={todo} addTodos={addTodos} setTodo={setTodo} />
      <ul className="mt-6">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
