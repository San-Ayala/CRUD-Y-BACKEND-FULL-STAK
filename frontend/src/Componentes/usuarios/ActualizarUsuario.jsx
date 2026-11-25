import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ActualizarUsuario() {

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [estado, setEstado] = useState("Activo")

    const { id } = useParams()
    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/usuarios")
        let datos = await respuesta.json()

        let usuario = datos.find((u) => u.id == id)

        if (usuario) {
            setNombre(usuario.nombre)
            setCorreo(usuario.correo || "")
            setTelefono(usuario.telefono || "")
            setEstado(usuario.estado || "Activo")
        } else {
            alert("Usuario no encontrado")
            navigate("/usuarios")
        }
    }

    useEffect(() => {
        consultar()
    }, [id])

    async function actualizar() {

        if (nombre === "" || correo === "" || telefono === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/usuarios/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                estado: estado
            })
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)

        if (respuesta.ok) {
            navigate("/usuarios")
        }
    }

    return (
        <div>
            <h2>Actualizar Usuario</h2>

            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />

            <input
                type="text"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />

            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
            </select>

            <button onClick={actualizar}>Guardar cambios</button>

            <button onClick={() => navigate("/usuarios")}>
                Cancelar
            </button>
        </div>
    )
}

export default ActualizarUsuario