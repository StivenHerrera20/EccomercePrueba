// Single-responsibility principle

const express = require("express");
const app = express(); //creamos nuestra aplicacion llamando el metodo constructor de express
app.use("/", require("./modules/productos")); //redirigimos al modulo productos donde se resolverán las rutas
app.use("/", require("./modules/usuarios")); //redirigimos al modulo usuarios donde se resolverán las rutas
app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en : http://localhost:4000");
});
