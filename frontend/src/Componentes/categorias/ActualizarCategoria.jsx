import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ActualizarCategoria() {

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    async function consultar() {

        let respuesta = await fetch("http://localhost:3000/api/categorias")
        let datos = await respuesta.json()

        if (!respuesta.ok) {
            alert(datos.mensaje)
            return
        }

        let categoria = datos.find((c) => c.id == id)

        if (categoria) {
            setNombre(categoria.nombre)
            setDescripcion(categoria.descripcion || "")
        } else {
            alert("Categoria no encontrada")
            navigate("/categorias")
        }
    }

    useEffect(() => {
        consultar()
    }, [id])

    async function actualizar() {

        if (nombre === "" || descripcion === "") {
            alert("Complete todos los campos")
            return
        }

        let respuesta = await fetch("http://localhost:3000/api/categorias/" + id, {
            method: "PUT",
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
            navigate("/categorias")
        }
    }

    return (
        <div>
            <h2>Actualizar Categoria</h2>

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

            <button onClick={actualizar}>
                Guardar cambios
            </button>

            <button onClick={() => navigate("/categorias")}>
                Cancelar
            </button>
        </div>
    )
}

export default ActualizarCategoria