import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaLibros() {

    const [libros, setLibros] = useState([])
    const [autores, setAutores] = useState([])
    const [categorias, setCategorias] = useState([])

    const [titulo, setTitulo] = useState("")
    const [isbn, setIsbn] = useState("")
    const [anio_publicacion, setAnioPublicacion] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [autor_id, setAutorId] = useState("")
    const [categoria_id, setCategoriaId] = useState("")

    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/libros")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setLibros(datos)
        } else {
            alert(datos.mensaje)
        }
    }

    async function consultarAutores() {
        let respuesta = await fetch("http://localhost:3000/api/autores")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setAutores(datos)
        }
    }

    async function consultarCategorias() {
        let respuesta = await fetch("http://localhost:3000/api/categorias")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setCategorias(datos)
        }
    }

    useEffect(() => {
        consultar()
        consultarAutores()
        consultarCategorias()
    }, [])

    async function registrar() {

        if (titulo === "" || isbn === "" ||
            anio_publicacion === "" || cantidad === "" ||
            autor_id === "" || categoria_id === "") {

            alert("Complete todos los campos")
            return
        }

        if (Number(cantidad) < 0) {
            alert("La cantidad no puede ser negativa")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/libros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                isbn: isbn,
                anio_publicacion: Number(anio_publicacion),
                cantidad: Number(cantidad),
                autor_id: Number(autor_id),
                categoria_id: Number(categoria_id)
            })
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)

        if (respuesta.ok) {
            setTitulo("")
            setIsbn("")
            setAnioPublicacion("")
            setCantidad("")
            setAutorId("")
            setCategoriaId("")
            consultar()
        }
    }

    async function eliminar(id) {

        let respuesta = await fetch("http://localhost:3000/api/libros/" + id, {
            method: "DELETE"
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    return (
        <div>
            <h2>Gestion de Libros</h2>

            <input
                type="text"
                placeholder="Titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
            />

            <input
                type="number"
                placeholder="Año de publicacion"
                value={anio_publicacion}
                onChange={(e) => setAnioPublicacion(e.target.value)}
            />

            <input
                type="number"
                placeholder="Cantidad"
                min="0"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />

            <select
                value={autor_id}
                onChange={(e) => setAutorId(e.target.value)}
            >
                <option value="">Seleccione un autor</option>

                {autores.map((autor) => (
                    <option key={autor.id} value={autor.id}>
                        {autor.nombre}
                    </option>
                ))}
            </select>

            <select
                value={categoria_id}
                onChange={(e) => setCategoriaId(e.target.value)}
            >
                <option value="">Seleccione una categoria</option>

                {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>

            <button onClick={registrar}>Registrar</button>

            <h2>Libros registrados</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Año</th>
                        <th>Cantidad</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro.id}>
                            <td>{libro.id}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.isbn}</td>
                            <td>{libro.anio_publicacion}</td>
                            <td>{libro.cantidad}</td>
                            <td>{libro.autor}</td>
                            <td>{libro.categoria}</td>

                            <td>
                                <button onClick={() => navigate("/actualizarlibro/" + libro.id)}>
                                    Actualizar
                                </button>

                                <button onClick={() => eliminar(libro.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaLibros