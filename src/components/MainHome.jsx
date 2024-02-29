import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getRecetas } from '../helpers/queries';
import '../css/home.css'

const MainHome = () => {
  const [recetas, setRecetas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecetas = async () => {
      const data = await getRecetas();
      setRecetas(data);
    };
    fetchRecetas();
  }, []);

  const handleShowModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <section id="home">
        <h2>Bienvenidos a Recetas Rolling</h2>
        <p>
          ¡Explora deliciosas recetas para cocinar en casa y sorprender a tus seres queridos! En Recetas Rolling,
          encontrarás una amplia variedad de platos que te inspirarán en la cocina.
        </p>
      </section>
      <section id="recetas">
        <h2>Nuestras Recetas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {recetas.map((receta) => (
            <Card key={receta.id} style={{ width: '18rem', margin: '10px' }} onClick={() => handleShowModal(receta)}>
              <Card.Img variant="top" src={receta.imagen} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{receta.nombre}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRecipe?.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Ingredientes</h4>
            <ul>
              {selectedRecipe?.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
            <h4>Instrucciones</h4>
            <p>{selectedRecipe?.instrucciones}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
      <section id="contacto">
        <h2>Contacto</h2>
        <p>
          ¿Tienes alguna pregunta o sugerencia? ¡Contáctanos a través del formulario de contacto y estaremos encantados
          de ayudarte!
        </p>
        <Link to="/*">
          <Button variant="primary">Contáctanos</Button>
        </Link>
      </section>
    </div>
  );
};

export default MainHome;
