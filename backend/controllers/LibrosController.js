let conectar = require("../conexion/db");

class LibrosController {

    async registrar(req, res) {
        let {titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id} = req.body;

        try {
            await conectar.promise().query(
                "INSERT INTO libros (titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id) VALUES (?,?,?,?,?,?)",
                [titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id]
            );

            res.status(201).json({
                mensaje: "Libro registrado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al registrar libro",
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            let [resultado] = await conectar.promise().query(
                `SELECT libros.*,
                autores.nombre AS autor,
                categorias.nombre AS categoria
                FROM libros
                INNER JOIN autores
                ON libros.autor_id = autores.id
                INNER JOIN categorias
                ON libros.categoria_id = categorias.id`
            );

            res.json(resultado);

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al consultar libros"
            });
        }
    }

    async actualizar(req, res) {
        let {id} = req.params;
        let {titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id} = req.body;

        try {
            let [resultado] = await conectar.promise().query(
                "UPDATE libros SET titulo=?, isbn=?, anio_publicacion=?, cantidad=?, autor_id=?, categoria_id=? WHERE id=?",
                [titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Libro no encontrado"
                });
            }

            res.json({
                mensaje: "Libro actualizado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al actualizar libro",
                error: error.message
            });
        }
    }

    async eliminar(req, res) {
        let {id} = req.params;

        try {
            let [resultado] = await conectar.promise().query(
                "DELETE FROM libros WHERE id=?",
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Libro no encontrado"
                });
            }

            res.json({
                mensaje: "Libro eliminado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al eliminar libro",
                error: error.message
            });
        }
    }
}

module.exports = LibrosController;