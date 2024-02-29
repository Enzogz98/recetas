import React from 'react'
import error from '../assets/404.avif'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div>
      <img src={error} alt="error404" />
      <h3>La pagina esta en construccion <Link to="/">vuelva al inicio</Link> </h3>
    </div>
  )
}

export default Error404
