import { useState } from "react";

import "./listaApp.css";

export default function Lista({ item, onUpdate, onComplete, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(item.title ?? "");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleUpdate() {
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(item.id, value);
    setIsEdit(false);
  }

  function handleCheckboxChange(e) {
    onComplete(item.id, e.target.checked);
  }

  return (
    <div className="lista">
      {isEdit ? (
        <form onSubmit={handleSubmit} className="listaUpdateForm">
          <input
            className="listaInput"
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button className="button" onClick={handleUpdate}>
            Guardar
          </button>
        </form>
      ) : (
        <div className="listaInfo">
          <input
            type={"checkbox"}
            onChange={handleCheckboxChange}
            checked={item.checked}
          />
          <span
            className="listaTitle"
            style={{
              color: item.completed ? "#ccc" : "",
              textDecoration: item.completed ? "line-through" : "",
            }}
          >
            {item.title}
          </span>
          <button className="button" onClick={() => setIsEdit(true)}>
            Editar
          </button>
          <button className="buttonDelete" onClick={() => onDelete(item.id)}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
