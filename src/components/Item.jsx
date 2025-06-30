import React from "react";

function Item({ item, deleteItem, editItem }) {
  return (
    <li>
      <strong>{item.nombre}</strong> - {item.asignatura} - Promedio: {item.promedio} ➜ <em>{item.etiqueta}</em>
      <button onClick={() => editItem(item)}>Editar</button>
      <button onClick={() => deleteItem(item.id)}>Eliminar</button>
    </li>
  );
}

export default Item;
