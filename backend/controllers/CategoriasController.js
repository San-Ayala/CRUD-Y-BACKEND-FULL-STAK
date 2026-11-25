let conectar = require("../conexion/db");

class CategoriasController {

    async registrar(req, res) {
        let {nombre, descripcion} = req.body;

        try {
            await conectar.promise().query(
                "INSERT INTO categorias (nombre, descripcion) VALUES (?,?)",
                [nombre, descripcion]
            );

            res.status(201).json({
                mensaje: "Categoria registrada correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al registrar categoria",
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            let [resultado] = await conectar.promise().query(
                "SELECT * FROM categorias"
            );

            res.json(resultado);

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al consultar categorias"
            });
        }
    }

    async actualizar(req, res) {
        let {id} = req.params;
        let {nombre, descripcion} = req.body;

        try {
            let [resultado] = await conectar.promise().query(
                "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?",
                [nombre, descripcion, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Categoria no encontrada"
                });
            }

            res.json({
                mensaje: "Categoria actualizada correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al actualizar categoria",
                error: error.message
            });
        }
    }

    async eliminar(req, res) {
        let {id} = req.params;

        try {
            let [resultado] = await conectar.promise().query(
                "DELETE FROM categorias WHERE id=?",
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Categoria no encontrada"
                });
            }

            res.json({
                mensaje: "Categoria eliminada correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al eliminar categoria",
                error: error.message
            });
        }
    }
}

module.exports = CategoriasController;