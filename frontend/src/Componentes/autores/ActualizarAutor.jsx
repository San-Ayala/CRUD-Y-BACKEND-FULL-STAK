import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ActualizarAutor() {

    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [fecha_nacimiento, setFechaNacimiento] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    async function consultar() {

        let respuesta = await fetch("http://localhost:3000/api/autores")
        let datos = await respuesta.json()

        if (!respuesta.ok) {
            alert(datos.mensaje)
            return
        }

        let autor = datos.find((a) => a.id == id)

        if (autor) {
            setNombre(autor.nombre)
            setNacionalidad(autor.nacionalidad || "")

            if (autor.fecha_nacimiento) {
                setFechaNacimiento(autor.fecha_nacimiento.slice(0, 10))
            }
        } else {
            alert("Autor no encontrado")
            navigate("/autores")
        }
    }

    useEffect(() => {
        consultar()
    }, [id])

    async function actualizar() {

        if (nombre === "" || nacionalidad === "" || fecha_nacimiento === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/autores/" + id, {
            method: "PUT",
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
            navigate("/autores")
        }
    }

    return (
        <div>
            <h2>Actualizar Autor</h2>

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

            <button onClick={actualizar}>
                Guardar cambios
            </button>

            <button onClick={() => navigate("/autores")}>
                Cancelar
            </button>
        </div>
    )
}

export default ActualizarAutor