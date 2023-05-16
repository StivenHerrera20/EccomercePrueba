const urlApi = "http://localhost:4000/login";
const btnEnviar = document.querySelector("#btnEnviar");
const constraseña = document.querySelector("#constraseña");
const email = document.querySelector("#email");

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      constraseña: constraseña.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {});
});
