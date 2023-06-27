import { useState } from "react";
import Lista from "./lista";

import "./listaApp.css";

export default function ListaApp() {
  const [title, setTitle] = useState("");
  const [listas, setListas] = useState([]);
  const [editItem, setEditItem] = useState(null);

  function handleInputChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newLista = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    const oldListas = [...listas];
    oldListas.unshift(newLista);

    setListas(oldListas);
    setTitle("");
  }

  function handleDelete(id) {
    const tempListas = listas.filter((item) => item.id !== id);

    setListas([...tempListas]);
  }

  function handleUpdate(id, value) {
    const temp = [...listas];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setListas([...temp]);
  }

  function handleCheckboxChange(id, status) {
    const temp = [...listas];
    const item = temp.find((item) => item.id === id);
    item.completed = status;

    console.log("Holis");
    setListas([...temp]);
  }

  return (
    <div className="listaContainer">
    <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit} className="listaCreateForm">
        <input
          onChange={handleInputChange}
          value={title}
          className="listaInput"
        />
        <input value="Crear tarea" type={"submit"} className="buttonCreate" />
      </form>

      <div className="listasContainer">
        {listas.map((item) => (
          <Lista
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onComplete={handleCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}
