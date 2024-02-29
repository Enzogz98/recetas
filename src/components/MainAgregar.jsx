import { useState } from 'react';
import { agregarReceta } from '../helpers/queries.js';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const MainAgregar = () => {
    const [nuevaReceta, setNuevaReceta] = useState({ nombre: '', ingredientes: '', instrucciones: '', imagen: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
  const newValue = name === 'ingredientes' ? value.split(',') : value;
  
  setNuevaReceta(prevState => ({
    ...prevState,
    [name]: newValue
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultado = await agregarReceta(nuevaReceta);
    if (resultado) {
      Swal.fire({
        icon: 'success',
        title: 'Receta agregada exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      setNuevaReceta({ nombre: '', ingredientes: '', instrucciones: '', imagen: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al agregar la receta',
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control type="text" name="nombre" value={nuevaReceta.nombre} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="ingredientes">
        <Form.Label>Ingredientes:</Form.Label>
        <Form.Control type="text" name="ingredientes" value={nuevaReceta.ingredientes} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="instrucciones">
        <Form.Label>Instrucciones:</Form.Label>
        <Form.Control as="textarea" name="instrucciones" value={nuevaReceta.instrucciones} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="imagen">
        <Form.Label>URL de la Imagen:</Form.Label>
        <Form.Control type="text" name="imagen" value={nuevaReceta.imagen} onChange={handleInputChange} />
      </Form.Group>
      <Button variant="primary" type="submit">Agregar Receta</Button>
    </Form>
    </div>
  )
}

export default MainAgregar
