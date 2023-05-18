//modulo para usuarios

const express = require("express");
const cors = require("cors"); // para evitar restricciones entre llamadas de sitios
const usuario = express.Router(); // trae el metodo router de express para hacer los endpoint  http://www.misitio.com/api/clients
const conex = require("./bdatos");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { error } = require("console");
const { userInfo } = require("os");
//const url_permitida = "http://127.0.0.1:5500"; //evitar el error de politicas de cors

//middlewares requeridos
//middlewares: logica de intercambio entre las aplicaciones, traductor de datos entre aplicaciones distribuidas
usuario.use(express.json()); //serializa la data en JSON
usuario.use(cors());
usuario.options("*", cors());

// construimos los endpoint
// listar todos usamos el GET

usuario.get("/usuarios", async (req, res) => {
  try {
    conex.query(
      "SELECT idUsuario, email, apellido FROM usuario",
      (error, respuesta) => {
        console.log(respuesta);
        res.send(respuesta);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// insertar un registro

usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      email: req.body.email,
      constraseña: bcrypt.hashSync(req.body.constraseña, 7),
      direccion: req.body.direccion,
      cuidad: req.body.cuidad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
      apellido: req.body.apellido,
    };
    conex.query("INSERT INTO usuario SET ?", data, (error, respuesta) => {
      console.log(respuesta);
      //res.send("Insercion exitosa!");
      res.send(true);
    });
  } catch (error) {
    res.send(false);
  }
});
// editar

usuario.put("/usuarios/:id", async (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    constraseña: bcrypt.hashSync(req.body.constraseña, 7),
    direccion: req.body.direccion,
    cuidad: req.body.cuidad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    apellido: req.body.apellido,
  };
  conex.query("UPDATE usuario SET  ? where id = ?", [data, id]),
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

usuario.delete("/usuarios/:id", (req, res) => {
  let id = req.params.id;
  conex.query("DELETE FROM usuario where id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
      } else {
        //res.status(201)
        res.status(201).send(respuesta);
      }
    };
});

//login usuario
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const constraseña = req.body.constraseña;
    //Validamos que lleguen los datos completos
    if (!email || !constraseña) {
      console.log("Debe enviar los datos completos");
    } else {
      conex.query(
        "SELECT * FROM usuario WHERE email = ?",
        email,
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(constraseña, respuesta[0].constraseña))
          ) {
            //res.send({ estado: true, nombre: "juanito" });
            res.send(false);
          } else {
            //Enviamos las variables al frontend para que cargue la pagina
            res.send(true);
          }
        }
      );
    }
  } catch (error) {
    console.log("pailas");
  }
});
module.exports = usuario;
