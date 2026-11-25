import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaPrestamos() {

    const [prestamos, setPrestamos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [libros, setLibros] = useState([])

    const [usuario_id, setUsuarioId] = useState("")
    const [libro_id, setLibroId] = useState("")
    const [fecha_prestamo, setFechaPrestamo] = useState("")
    const [fecha_devolucion, setFechaDevolucion] = useState("")
    const [estado, setEstado] = useState("Activo")

    const navigate = useNavigate()

    async function consultar() {
        let respuesta = await fetch("http://localhost:3000/api/prestamos")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setPrestamos(datos)
        } else {
            alert(datos.mensaje)
        }
    }

    async function consultarUsuarios() {
        let respuesta = await fetch("http://localhost:3000/api/usuarios")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setUsuarios(datos)
        }
    }

    async function consultarLibros() {
        let respuesta = await fetch("http://localhost:3000/api/libros")
        let datos = await respuesta.json()

        if (respuesta.ok) {
            setLibros(datos)
        }
    }

    useEffect(() => {
        consultar()
        consultarUsuarios()
        consultarLibros()
    }, [])

    async function registrar() {

        if (usuario_id === "" || libro_id === "" ||
            fecha_prestamo === "" || fecha_devolucion === "") {

            alert("Complete todos los campos")
            return
        }

        if (fecha_devolucion < fecha_prestamo) {
            alert("La fecha de devolucion no puede ser anterior al prestamo")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/prestamos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: Number(usuario_id),
                libro_id: Number(libro_id),
                fecha_prestamo: fecha_prestamo,
                fecha_devolucion: fecha_devolucion,
                estado: estado
            })
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)

        if (respuesta.ok) {
            setUsuarioId("")
            setLibroId("")
            setFechaPrestamo("")
            setFechaDevolucion("")
            setEstado("Activo")
            consultar()
        }
    }

    async function eliminar(id) {

        let respuesta = await fetch("http://localhost:3000/api/prestamos/" + id, {
            method: "DELETE"
        })

        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    return (
        <div>
            <h2>Gestion de Prestamos</h2>

            <select
                value={usuario_id}
                onChange={(e) => setUsuarioId(e.target.value)}
            >
                <option value="">Seleccione un usuario</option>

                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                    </option>
                ))}
            </select>

            <select
                value={libro_id}
                onChange={(e) => setLibroId(e.target.value)}
            >
                <option value="">Seleccione un libro</option>

                {libros.map((libro) => (
                    <option key={libro.id} value={libro.id}>
                        {libro.titulo}
                    </option>
                ))}
            </select>

            <label>Fecha de prestamo</label>

            <input
                type="date"
                value={fecha_prestamo}
                onChange={(e) => setFechaPrestamo(e.target.value)}
            />

            <label>Fecha de devolucion</label>

            <input
                type="date"
                value={fecha_devolucion}
                onChange={(e) => setFechaDevolucion(e.target.value)}
            />

            <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            >
                <option value="Activo">Activo</option>
                <option value="Devuelto">Devuelto</option>
                <option value="Vencido">Vencido</option>
            </select>

            <button onClick={registrar}>Registrar</button>

            <h2>Prestamos registrados</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Libro</th>
                        <th>Fecha de prestamo</th>
                        <th>Fecha de devolucion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {prestamos.map((prestamo) => (
                        <tr key={prestamo.id}>
                            <td>{prestamo.id}</td>
                            <td>{prestamo.usuario}</td>
                            <td>{prestamo.libro}</td>

                            <td>
                                {prestamo.fecha_prestamo
                                    ? prestamo.fecha_prestamo.slice(0, 10)
                                    : ""}
                            </td>

                            <td>
                                {prestamo.fecha_devolucion
                                    ? prestamo.fecha_devolucion.slice(0, 10)
                                    : ""}
                            </td>

                            <td>{prestamo.estado}</td>

                            <td>
                                <button onClick={() => navigate("/actualizarprestamo/" + prestamo.id)}>
                                    Actualizar
                                </button>

                                <button onClick={() => eliminar(prestamo.id)}>
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

export default TablaPrestamos