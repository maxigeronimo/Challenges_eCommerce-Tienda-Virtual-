
const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const email = document.querySelector("[data-email]").value;
  const password = document.querySelector("[data-password]").value;

  if (email.length > 5 && password.length > 5) {
    window.location.href = "../screens/produto.html";
  } else {
    alert("Por favor, insira mais de 5 caracteres no email e senha.");
  }
});



import { productoServices } from "../servicios/producto-servicios.js";
function enviar(event) {
  let nombre = document.getElementById('nombre').value;
  let respuesta = document.getElementById('respuesta').checked;
  let resultado = document.getElementById('resultado').value;
  // let pregunta = JSON.stringify({ nombre, respuesta, resultado });
  //Cookies.set("pregunta", pregunta);
  //Cookies.get("pregunta");
  productoServices
    .creaMensje(nombre, resultado, respuesta)
    .then((resposta) => {
      window.location.href = "../index.html";
      console.log(resposta);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(pregunta);
  // document.getElementById('res').innerText = pregunta;
}

document.getElementById('enviar').addEventListener('click', enviar);