let express = require("express");
let PrestamosController = require("../controllers/PrestamosController");

let router = express.Router();
let prestamo = new PrestamosController();

router.post("/", prestamo.registrar);
router.get("/", prestamo.listar);
router.put("/:id", prestamo.actualizar);
router.delete("/:id", prestamo.eliminar);

module.exports = router;