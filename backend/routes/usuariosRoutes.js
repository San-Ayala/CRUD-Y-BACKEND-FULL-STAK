let express = require("express");
let UsuariosController = require("../controllers/UsuariosController");

let router = express.Router();
let usuario = new UsuariosController();

router.post("/", usuario.registrar);
router.get("/", usuario.listar);
router.put("/:id", usuario.actualizar);
router.delete("/:id", usuario.eliminar);

module.exports = router;