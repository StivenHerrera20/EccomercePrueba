let dato = 9;

if (dato <= 8) {
  Swal.fire({
    icon: "error",
    title: "Uyyy se les daña...",
    text: "El valor es menor!",
    footer: '<a href="">Why do I have this issue?</a>',
  });
} else {
  Swal.fire({
    icon: "success",
    title: "Exito...",
    text: "Muy bien!",
    footer: '<a href="">Why do I have this issue?</a>',
  });
}
