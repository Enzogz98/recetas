const URI_RECETAS=import.meta.env.VITE_API_RECETAS
console.log(URI_RECETAS)

export const getRecetas = async () => {
    try {
      const response = await fetch(URI_RECETAS);
      const data = await response.json();
      console.log('Recetas obtenidas:', data); 
      return data;
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
      return [];
    }
  };
  
  export const getRecetaById = async (id) => {
    try {
      const response = await fetch(`${URI_RECETAS}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al obtener la receta con ID ${id}:`, error);
      return null;
    }
  };
  
  export const agregarReceta = async (nuevaReceta) => {
    try {
      const response = await fetch(URI_RECETAS);
      const recetas = await response.json();
  
      const ultimoId = recetas.reduce((maxId, receta) => Math.max(maxId, parseInt(receta.id)), 0);

      nuevaReceta.id = (ultimoId + 1).toString();
  
      const responseAgregar = await fetch(URI_RECETAS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaReceta)
      });
      const data = await responseAgregar.json();
      return data;
    } catch (error) {
      console.error('Error al agregar la receta:', error);
      return null;
    }
  };
  
  
  export const actualizarReceta = async (id, datosActualizados) => {
    try {
      const response = await fetch(`${URI_RECETAS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al actualizar la receta con ID ${id}:`, error);
      return null;
    }
  };
  
  export const eliminarReceta = async (id) => {
    try {
      const response = await fetch(`${URI_RECETAS}/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        console.log(`Receta con ID ${id} eliminada exitosamente`);
        return true; 
      } else {
        console.error(`Error al eliminar la receta con ID ${id}:`, response.statusText);
        return false; 
      }
    } catch (error) {
      console.error(`Error al eliminar la receta con ID ${id}:`, error);
      return false; 
    }
  };
  