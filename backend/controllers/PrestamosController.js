let conectar = require("../conexion/db");

class PrestamosController {

    async registrar(req, res) {
        let {usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado} = req.body;

        try {
            await conectar.promise().query(
                "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES (?,?,?,?,?)",
                [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado]
            );

            res.status(201).json({
                mensaje: "Prestamo registrado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al registrar prestamo",
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            let [resultado] = await conectar.promise().query(
                `SELECT prestamos.*,
                usuarios.nombre AS usuario,
                libros.titulo AS libro
                FROM prestamos
                INNER JOIN usuarios
                ON prestamos.usuario_id = usuarios.id
                INNER JOIN libros
                ON prestamos.libro_id = libros.id`
            );

            res.json(resultado);

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al consultar prestamos"
            });
        }
    }

    async actualizar(req, res) {
        let {id} = req.params;
        let {usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado} = req.body;

        try {
            let [resultado] = await conectar.promise().query(
                "UPDATE prestamos SET usuario_id=?, libro_id=?, fecha_prestamo=?, fecha_devolucion=?, estado=? WHERE id=?",
                [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Prestamo no encontrado"
                });
            }

            res.json({
                mensaje: "Prestamo actualizado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al actualizar prestamo",
                error: error.message
            });
        }
    }

    async eliminar(req, res) {
        let {id} = req.params;

        try {
            let [resultado] = await conectar.promise().query(
                "DELETE FROM prestamos WHERE id=?",
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Prestamo no encontrado"
                });
            }

            res.json({
                mensaje: "Prestamo eliminado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al eliminar prestamo",
                error: error.message
            });
        }
    }
}

module.exports = PrestamosController;