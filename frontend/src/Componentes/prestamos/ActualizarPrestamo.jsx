import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ActualizarPrestamo() {

    const [usuarios, setUsuarios] = useState([])
    const [libros, setLibros] = useState([])

    const [usuario_id, setUsuarioId] = useState("")
    const [libro_id, setLibroId] = useState("")
    const [fecha_prestamo, setFechaPrestamo] = useState("")
    const [fecha_devolucion, setFechaDevolucion] = useState("")
    const [estado, setEstado] = useState("Activo")

    const { id } = useParams()
    const navigate = useNavigate()

    async function consultar() {

        let respuesta = await fetch("http://localhost:3000/api/prestamos")
        let datos = await respuesta.json()

        if (!respuesta.ok) {
            alert(datos.mensaje)
            return
        }

        let prestamo = datos.find((p) => p.id == id)

        if (prestamo) {

            setUsuarioId(prestamo.usuario_id ?? "")
            setLibroId(prestamo.libro_id ?? "")
            setEstado(prestamo.estado || "Activo")

            if (prestamo.fecha_prestamo) {
                setFechaPrestamo(prestamo.fecha_prestamo.slice(0, 10))
            }

            if (prestamo.fecha_devolucion) {
                setFechaDevolucion(prestamo.fecha_devolucion.slice(0, 10))
            }

        } else {
            alert("Prestamo no encontrado")
            navigate("/prestamos")
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
    }, [id])

    async function actualizar() {

        if (usuario_id === "" || libro_id === "" ||
            fecha_prestamo === "" || fecha_devolucion === "") {

            alert("Complete todos los campos")
            return
        }

        if (fecha_devolucion < fecha_prestamo) {
            alert("La fecha de devolucion no puede ser anterior al prestamo")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/prestamos/" + id, {
            method: "PUT",
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
            navigate("/prestamos")
        }
    }

    return (
        <div>
            <h2>Actualizar Prestamo</h2>

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

            <button onClick={actualizar}>
                Guardar cambios
            </button>

            <button onClick={() => navigate("/prestamos")}>
                Cancelar
            </button>
        </div>
    )
}

export default ActualizarPrestamo