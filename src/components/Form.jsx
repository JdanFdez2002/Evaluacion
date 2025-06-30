import React, { useState, useEffect } from 'react';


function Form({ addOrUpdateItem, itemToEdit }) {
  // Estado del valor del input
 const [nombre, setNombre] = useState('');
const [asignatura, setAsignatura] = useState('');
const [promedio, setPromedio] = useState('');


  // Si hay un ítem a editar, llena el input con su valor
useEffect(() => {
  if (itemToEdit) {
    setNombre(itemToEdit.nombre || '');
    setAsignatura(itemToEdit.asignatura || '');
    setPromedio(itemToEdit.promedio || '');
  } else {
    setNombre('');
    setAsignatura('');
    setPromedio('');
  }
}, [itemToEdit]);

/*
  // Maneja el envío del formulario
const handleSubmit = (e) => {
  e.preventDefault();
  if (!nombre || !asignatura || !promedio) return;

  addOrUpdateItem({ nombre, asignatura, promedio });
  setNombre('');
  setAsignatura('');
  setPromedio('');
};
*/

const handleSubmit = (e) => {
  e.preventDefault();
  if (!nombre || !asignatura || !promedio) return;

  const numPromedio = Number(promedio);
  if (numPromedio < 1 || numPromedio > 7) {
    alert("El promedio debe estar entre 1 y 7");
    return;
  }

addOrUpdateItem({ nombre, asignatura, promedio: numPromedio }); // envías el número convertido

  setNombre('');
  setAsignatura('');
  setPromedio('');
};


  return (
    <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Nombre"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="Asignatura"
    value={asignatura}
    onChange={(e) => setAsignatura(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Promedio"
    value={promedio}
    onChange={(e) => setPromedio(e.target.value)}
    required
    min="1"
    max="7"
    step="0.1"
  />
  <button type="submit">
    {itemToEdit ? 'Actualizar' : 'Agregar'}
  </button>
</form>
  );
}

export default Form;
