let conectar = require("../conexion/db");

class AutoresController {

    async registrar(req, res) {
        let {nombre, nacionalidad, fecha_nacimiento} = req.body;

        try {
            await conectar.promise().query(
                "INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?,?,?)",
                [nombre, nacionalidad, fecha_nacimiento]
            );

            res.status(201).json({
                mensaje: "Autor registrado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al registrar autor",
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            let [resultado] = await conectar.promise().query(
                "SELECT * FROM autores"
            );

            res.json(resultado);

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al consultar autores"
            });
        }
    }

    async actualizar(req, res) {
        let {id} = req.params;
        let {nombre, nacionalidad, fecha_de_nacimiento} = req.body;

        try {
            let [resultado] = await conectar.promise().query(
                "UPDATE autores SET nombre=?, nacionalidad=?, fecha_nacimiento=? WHERE id=?",
                [nombre, nacionalidad, fecha_de_nacimiento, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Autor no encontrado"
                });
            }

            res.json({
                mensaje: "Autor actualizado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al actualizar autor",
                error: error.message
            });
        }
    }

    async eliminar(req, res) {
        let {id} = req.params;

        try {
            let [resultado] = await conectar.promise().query(
                "DELETE FROM autores WHERE id=?",
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Autor no encontrado"
                });
            }

            res.json({
                mensaje: "Autor eliminado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al eliminar autor",
                error: error.message
            });
        }
    }
}

module.exports = AutoresController;