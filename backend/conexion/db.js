let mysql = require("mysql2");

let conectar = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "sant1236",
    database: "biblioteca",
    port: 3306
});

conectar.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Conexion exitosa a MySQL");
    }
});

module.exports = conectar;