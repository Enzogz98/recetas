import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { getRecetas, eliminarReceta } from '../helpers/queries.js';
import Swal from 'sweetalert2';


const MainAdministrar = () => {
    const [recetas, setRecetas] = useState([]);
    const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  
    useEffect(() => {
      cargarRecetas();
    }, []);
  
    const cargarRecetas = async () => {
      const recetasData = await getRecetas();
      setRecetas(recetasData);
    };
  
    const handleVerDetalles = (receta) => {
      setRecetaSeleccionada(receta);
    };
  
    const handleEliminarReceta = async (id) => {
        const exito = await eliminarReceta(id);
        if (exito) {
            cargarRecetas();
            Swal.fire({
                icon: 'success',
                title: 'Receta eliminada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al eliminar la receta'
            });
        }
    };
  return (
    <>
      <h1>Lista de Recetas</h1>
      <ul>
        {recetas.map(receta => (
          <li key={receta.id}>
            <div>
              <h3>{receta.nombre}</h3>
              <img src={receta.imagen} alt={receta.nombre} style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <button onClick={() => handleVerDetalles(receta)}>Ver Detalles</button>
              <button onClick={() => handleEliminarReceta(receta.id)}>Eliminar</button>
            </div>
            {recetaSeleccionada && recetaSeleccionada.id === receta.id && (
              <div>
                <p>Ingredientes: {receta.ingredientes.join(', ')}</p>
                <p>Instrucciones: {receta.instrucciones}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Link to="/agregar"><button>Agregar Receta</button></Link>
      <Link to="/editar"><button>Editar Receta</button></Link>
    </>
  )
}

export default MainAdministrar
