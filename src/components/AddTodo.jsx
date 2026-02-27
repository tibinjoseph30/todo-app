import { useRef, useEffect } from "react";

const AddTodo = ({ todo, addTodos, setTodo }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <form onSubmit={addTodos} className="flex sm:flex-row flex-col gap-4 items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type todos"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="bg-gray-200/10 w-full px-4 py-3 text-white/60 rounded-md outline-none"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-3 rounded-md whitespace-nowrap max-sm:w-full"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
