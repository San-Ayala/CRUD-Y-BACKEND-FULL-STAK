let conectar = require("../conexion/db");

class UsuariosController {

    async registrar(req, res) {
        let {nombre, correo, telefono, estado} = req.body;

        try {
            await conectar.promise().query(
                "INSERT INTO usuarios (nombre, correo, telefono, estado) VALUES (?,?,?,?)",
                [nombre, correo, telefono, estado]
            );

            res.status(201).json({
                mensaje: "Usuario registrado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al registrar usuario",
                error: error.message
            });
        }
    }

    async listar(req, res) {
        try {
            let [resultado] = await conectar.promise().query(
                "SELECT * FROM usuarios"
            );

            res.json(resultado);

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al consultar usuarios"
            });
        }
    }

    async actualizar(req, res) {
        let {id} = req.params;
        let {nombre, correo, telefono, estado} = req.body;

        try {
            let [resultado] = await conectar.promise().query(
                "UPDATE usuarios SET nombre=?, correo=?, telefono=?, estado=? WHERE id=?",
                [nombre, correo, telefono, estado, id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.json({
                mensaje: "Usuario actualizado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al actualizar usuario",
                error: error.message
            });
        }
    }

    async eliminar(req, res) {
        let {id} = req.params;

        try {
            let [resultado] = await conectar.promise().query(
                "DELETE FROM usuarios WHERE id=?",
                [id]
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            res.json({
                mensaje: "Usuario eliminado correctamente"
            });

        } catch (error) {
            res.status(400).json({
                mensaje: "Error al eliminar usuario",
                error: error.message
            });
        }
    }
}

module.exports = UsuariosController;