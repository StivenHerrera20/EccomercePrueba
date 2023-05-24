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
      "SELECT idUsuario, email, apellidos FROM usuario",
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
      apellidos: req.body.apellidos,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      zonaPostal: req.body.zonaPostal,
      telefono: req.body.telefono,
      esAdmin: req.body.esAdmin,
    };
    conex.query("INSERT INTO usuario SET ?", data, (error, respuesta) => {
      if (error) {
        res.send(false);
        console.log(error);
      } else {
        res.send(true);
      }
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
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 7),
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    zonaPostal: req.body.zonaPostal,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
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
    const password = req.body.password;
    //Validamos que lleguen los datos completos
    if (!email || !password) {
      console.log("Debe enviar los datos completos");
    } else {
      conex.query(
        "SELECT * FROM usuario WHERE email = ?",
        email,
        async (error, respuesta) => {
          if (
            respuesta.length == 0 ||
            !(await bcrypt.compare(password, respuesta[0].password))
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
