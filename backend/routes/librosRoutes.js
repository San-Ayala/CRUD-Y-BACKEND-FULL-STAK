let express = require("express");
let LibrosController = require("../controllers/LibrosController");

let router = express.Router();
let libro = new LibrosController();

router.post("/", libro.registrar);
router.get("/", libro.listar);
router.put("/:id", libro.actualizar);
router.delete("/:id", libro.eliminar);

module.exports = router;