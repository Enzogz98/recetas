import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./common/Header";
import Footer from "./common/Footer";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Administrar from "./pages/Administrar";
import Agregar from "./pages/Agregar";
import Editar from "./pages/Editar";

function App() {


  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/administrador" element={<Administrar/>}></Route>
      <Route exact path="/agregar" element={<Agregar/>}></Route>
      <Route exact path="/editar" element={<Editar/>}></Route>
      <Route path="*" element={<Error404/>} /> 

    </Routes>
    <Footer/>
    </BrowserRouter>


    </>
  )
}

export default App
