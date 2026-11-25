import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaUsuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [estado, setEstado] = useState("Activo")

    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/usuarios")
        let datos = await respuesta.json()
        setUsuarios(datos)
    }

    useEffect(() => {
        consultar()
    }, [])

    async function registrar() {

        if (nombre === "" || correo === "" || telefono === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
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
            setNombre("")
            setCorreo("")
            setTelefono("")
            setEstado("Activo")
            consultar()
        }
    }

    async function eliminar(id) {

        let respuesta = await fetch("http://localhost:3000/api/usuarios/" + id, {
            method: "DELETE"
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    return (
        <div>
            <h2>Gestion de Usuarios</h2>

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

            <button onClick={registrar}>Registrar</button>

            <h2>Usuarios registrados</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <button onClick={() => navigate("/actualizarusuario/" + usuario.id)}>
                                    Actualizar
                                </button>

                                <button onClick={() => eliminar(usuario.id)}>
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

export default TablaUsuarios