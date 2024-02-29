import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { getRecetas, getRecetaById, actualizarReceta } from '../helpers/queries';


const MainEditar = () => {
    const [recetas, setRecetas] = useState([]);
    const [formularioActivo, setFormularioActivo] = useState(false);
    const [idReceta,setId]= useState("")
    const [datosReceta, setDatosReceta] = useState({
        nombre: '',
        ingredientes: '',
        instrucciones: '',
        imagen: ''
    });

    useEffect(() => {
        const fetchRecetas = async () => {
            const data = await getRecetas();
            setRecetas(data);
        };
        fetchRecetas();
    }, []);

    const handleSeleccionarReceta = async (id) => {
        const receta = await getRecetaById(id);
        setDatosReceta(receta);
        setId(receta.id)
        setFormularioActivo(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosReceta(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exito = await actualizarReceta(idReceta, datosReceta);
        if (exito) {
            Swal.fire({
                icon: 'success',
                title: 'Receta actualizada exitosamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setFormularioActivo(false);
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar la receta'
            });
        }
    };


    return (
        <div>
            {!formularioActivo && (
                <>
                    <h2>Selecciona una receta para editar:</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {recetas.map(receta => (
                            <div key={receta.id} style={{ margin: '10px' }}>
                                <img
                                    src={receta.imagen}
                                    alt={receta.nombre}
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <Button onClick={() => handleSeleccionarReceta(receta.id)}>
                                    Seleccionar
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {formularioActivo && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={datosReceta.nombre}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="ingredientes">
                        <Form.Label>Ingredientes:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ingredientes"
                            value={datosReceta.ingredientes}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="instrucciones">
                        <Form.Label>Instrucciones:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="instrucciones"
                            value={datosReceta.instrucciones}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="imagen">
                        <Form.Label>URL de la Imagen:</Form.Label>
                        <Form.Control
                            type="text"
                            name="imagen"
                            value={datosReceta.imagen}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Actualizar Receta
                    </Button>
                </Form>
            )}
        </div>
    );
};



export default MainEditar;
