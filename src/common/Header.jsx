import React from 'react'
import  {Navbar, Nav, Container} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
const Header = () => {
  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to='/'>
            <img src={logo} alt="Logo de Recetas rolling" className="img-fluid" width={150}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end to='/' className='nav-link'>Inicio</NavLink>
            <NavLink end to='/administrador' className='nav-link'>Administrador</NavLink>
            <NavLink end to='/agregar' className='nav-link'>Agregar</NavLink>
            <NavLink end to='/editar' className='nav-link'>Editar</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
