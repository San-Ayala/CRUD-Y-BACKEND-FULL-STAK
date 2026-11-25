import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaCategorias() {

    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/categorias")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setCategorias(datos)
        } else {
            alert(datos.mensaje)
        }
    }

    useEffect(() => {
        consultar()
    }, [])

    async function registrar() {

        if (nombre === "" || descripcion === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            })
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)

        if (respuesta.ok) {
            setNombre("")
            setDescripcion("")
            consultar()
        }
    }

    async function eliminar(id) {

        let respuesta = await fetch("http://localhost:3000/api/categorias/" + id, {
            method: "DELETE"
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    return (
        <div>
            <h2>Gestion de Categorias</h2>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            <button onClick={registrar}>Registrar</button>

            <h2>Categorias registradas</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td>{categoria.descripcion}</td>

                            <td>
                                <button onClick={() => navigate("/actualizarcategoria/" + categoria.id)}>
                                    Actualizar
                                </button>

                                <button onClick={() => eliminar(categoria.id)}>
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

export default TablaCategorias