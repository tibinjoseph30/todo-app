import { useState, useRef, useEffect } from "react";
import { X, Pencil, Check } from "lucide-react";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [checked, setChecked] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable) inputRef.current.focus();
  }, [isEditable]);

  const handleSave = () => {
    updateTodo(todo.id, editedText);
    setIsEditable(false);
  };

  return (
    <li className="border-b border-dashed border-white/10 py-3 text-white/80 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          disabled={isEditable}
        />
        {isEditable ? (
          <>
            <input
              ref={inputRef}
              onChange={(e) => setEditedText(e.target.value)}
              type="text"
              value={editedText}
              className="outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button onClick={() => setIsEditable(false)}>
              <X size={15} />
            </button>
          </>
        ) : (
          <span className={checked ? "line-through" : ""}>{todo.text}</span>
        )}
      </div>
      <div className="flex gap-4">
        {isEditable ? (
          <button onClick={handleSave}>
            <Check size={20} />
          </button>
        ) : (
          <button onClick={() => setIsEditable(!isEditable)}>
            <Pencil size={15} />
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="text-red-600">
          <X size={20} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
