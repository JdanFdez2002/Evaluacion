import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function obtenerEtiqueta(promedio) {
  if (promedio >= 1 && promedio <= 3.9) return "deficiente";
  if (promedio >= 4.0 && promedio <= 5.5) return "con mejora";
  if (promedio >= 5.6 && promedio <= 6.4) return "buen trabajo";
  if (promedio >= 6.5 && promedio <= 7.0) return "destacado";
  return "promedio inválido";
}

function App() {
  const [items, setItems] = useState(() => {
  const storedItems = localStorage.getItem('items');
  return storedItems ? JSON.parse(storedItems) : [];
  });
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = ({ nombre, asignatura, promedio }) => {
    const etiqueta = obtenerEtiqueta(promedio);

    if (itemToEdit) {
      setItems(items.map(item =>
        item.id === itemToEdit.id
          ? { ...item, nombre, asignatura, promedio, etiqueta }
          : item
      ));
      setItemToEdit(null);
    } else {
      setItems([...items, {
        id: Date.now(),
        nombre,
        asignatura,
        promedio,
        etiqueta
      }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />
      <List
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

export default App;
