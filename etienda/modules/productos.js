//modulo para productos

const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const producto = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
producto.use(express.json()); //serializa la data en JSON
producto.use(cors());
producto.options("*", cors());

// construimos los endpoint
// listar todos usamos el GET

producto.get("/productos", (req, res) => {
  conex.query("SELECT * FROM producto", (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

// insertar un registro

producto.post("/productos", (req, res) => {
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query("INSERT INTO producto set ?", data, (error, respuesta) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(respuesta);
    }
  });
});
// editar

producto.put("/productos/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    imagenes: req.body.imagenes,
    marca: req.body.marca,
    precio: req.body.precio,
    stock: req.body.stock,
    calificacion: req.body.calificacion,
    estado: req.body.estado,
    fechaCreacion: req.body.fechaCreacion,
  };
  conex.query("UPDATE producto SET  ? where idProducto = ?", [data, id]),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        res.status(201).send(respuesta);
        //  res.status(201).send(respuesta)
      }
    };
});
//borrar

producto.delete("/productos/:idProducto", (req, res) => {
  let id = req.params.idProducto;
  conex.query("DELETE FROM producto where idProducto = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        //res.status(201)
        res.status(201).send(respuesta);
      }
    };
});
module.exports = producto;
