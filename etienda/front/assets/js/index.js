//Swal.fire("Good job!", "You clicked the button!", "success");

const urlApi = "http://localhost:4000/";

//DOM
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btnEnviar = document.querySelector("#btnEnviar");
let btnRegistrarse = document.querySelector("#btnRegistrarse");
let nombre = document.querySelector("#name");
let apellidos = document.querySelector("#apellido");
let emailR = document.querySelector("#emailR");
let passwordR = document.querySelector("#passwordR");
let direccion = document.querySelector("#direccion");
let ciudad = document.querySelector("#ciudad");
let zonaPos = document.querySelector("#zonaPos");
let telefono = document.querySelector("#telefono");
let rol = document.querySelector("#rol");

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        window.location = "http://127.0.0.1:5500/front/dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Falla en la validacion...",
          text: "email o contraseña incorrecta!",
        });
      }
    });
});

btnRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi + "usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellidos: apellidos.value,
      email: emailR.value,
      password: passwordR.value,
      direccion: direccion.value,
      ciudad: ciudad.value,
      zonaPostal: zonaPos.value,
      telefono: telefono.value,
      esAdmin: rol.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        Swal.fire(
          "Felicidades!",
          "Te has registrado correctamente!",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "No es posible registrar...",
          text: "......!",
        });
      }
    });
});
