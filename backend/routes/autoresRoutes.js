let express = require("express");
let AutoresController = require("../controllers/AutoresController");

let router = express.Router();
let autor = new AutoresController();

router.post("/", autor.registrar);
router.get("/", autor.listar);
router.put("/:id", autor.actualizar);
router.delete("/:id", autor.eliminar);

module.exports = router;