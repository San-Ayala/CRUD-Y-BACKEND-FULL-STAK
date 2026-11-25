import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import TablaUsuarios from "./Componentes/usuarios/TablaUsuarios.jsx"
import ActualizarUsuario from "./Componentes/usuarios/ActualizarUsuario.jsx"

import TablaAutores from "./Componentes/autores/TablaAutores.jsx"
import ActualizarAutor from "./Componentes/autores/ActualizarAutor.jsx"

import TablaCategorias from "./Componentes/categorias/TablaCategorias.jsx"
import ActualizarCategoria from "./Componentes/categorias/ActualizarCategoria.jsx"

import TablaLibros from "./Componentes/libros/TablaLibros.jsx"
import ActualizarLibro from "./Componentes/libros/ActualizarLibro.jsx"

import TablaPrestamos from "./Componentes/prestamos/TablaPrestamos.jsx"
import ActualizarPrestamo from "./Componentes/prestamos/ActualizarPrestamo.jsx"

import "./App.css"

function App() {
    return (
        <BrowserRouter>

            <h1>Sistema de Gestion de Biblioteca</h1>

            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/usuarios">Usuarios</Link>
                <Link to="/autores">Autores</Link>
                <Link to="/categorias">Categorias</Link>
                <Link to="/libros">Libros</Link>
                <Link to="/prestamos">Prestamos</Link>
            </nav>

            <Routes>
                <Route path="/" element={<h2>Bienvenido a la biblioteca</h2>} />

                <Route path="/usuarios" element={<TablaUsuarios />} />
                <Route path="/actualizarusuario/:id" element={<ActualizarUsuario />} />

                <Route path="/autores" element={<TablaAutores />} />
                <Route path="/actualizarautor/:id" element={<ActualizarAutor />} />

                <Route path="/categorias" element={<TablaCategorias />} />
                <Route path="/actualizarcategoria/:id" element={<ActualizarCategoria />} />

                <Route path="/libros" element={<TablaLibros />} />
                <Route path="/actualizarlibro/:id" element={<ActualizarLibro />} />

                <Route path="/prestamos" element={<TablaPrestamos />} />
                <Route path="/actualizarprestamo/:id" element={<ActualizarPrestamo />} />
            </Routes>

        </BrowserRouter>
    )
}

export default App