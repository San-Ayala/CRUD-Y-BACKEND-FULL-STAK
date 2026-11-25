let express = require("express");
let CategoriasController = require("../controllers/CategoriasController");

let router = express.Router();
let categoria = new CategoriasController();

router.post("/", categoria.registrar);
router.get("/", categoria.listar);
router.put("/:id", categoria.actualizar);
router.delete("/:id", categoria.eliminar);

module.exports = router;