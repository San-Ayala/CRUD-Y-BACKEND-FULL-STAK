let express = require("express");
let cors = require("cors");
let conectar = require("./conexion/db");

let usuariosRoutes = require("./routes/usuariosRoutes");
let autoresRoutes = require("./routes/autoresRoutes");
let categoriasRoutes = require("./routes/categoriasRoutes");
let librosRoutes = require("./routes/librosRoutes");
let prestamosRoutes = require("./routes/prestamosRoutes");

let app = express();

app.use(express.json());
app.use(cors());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/libros", librosRoutes);
app.use("/api/prestamos", prestamosRoutes);

app.listen(3000, () => {
    console.log("Servidor activo en el puerto 3000");
});