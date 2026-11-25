import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaAutores() {

    const [autores, setAutores] = useState([])
    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [fecha_nacimiento, setFechaNacimiento] = useState("")

    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/autores")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setAutores(datos)
        } else {
            alert(datos.mensaje)
        }
    }

    useEffect(() => {
        consultar()
    }, [])

    async function registrar() {

        if (nombre === "" || nacionalidad === "" || fecha_nacimiento === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/autores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                nacionalidad: nacionalidad,
                fecha_nacimiento: fecha_nacimiento
            })
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)

        if (respuesta.ok) {
            setNombre("")
            setNacionalidad("")
            setFechaNacimiento("")
            consultar()
        }
    }

    async function eliminar(id) {

        let respuesta = await fetch("http://localhost:3000/api/autores/" + id, {
            method: "DELETE"
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    return (
        <div>
            <h2>Gestion de Autores</h2>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                placeholder="Nacionalidad"
                value={nacionalidad}
                onChange={(e) => setNacionalidad(e.target.value)}
            />

            <input
                type="date"
                value={fecha_nacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
            />

            <button onClick={registrar}>Registrar</button>

            <h2>Autores registrados</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Fecha de nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {autores.map((autor) => (
                        <tr key={autor.id}>
                            <td>{autor.id}</td>
                            <td>{autor.nombre}</td>
                            <td>{autor.nacionalidad}</td>
                            <td>
                                {autor.fecha_nacimiento
                                    ? autor.fecha_nacimiento.slice(0, 10)
                                    : ""}
                            </td>

                            <td>
                                <button onClick={() => navigate("/actualizarautor/" + autor.id)}>
                                    Actualizar
                                </button>

                                <button onClick={() => eliminar(autor.id)}>
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

export default TablaAutores