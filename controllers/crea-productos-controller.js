import { productoServices } from "../servicios/producto-servicios.js";

const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("[data-nome]").value;
  const url = document.querySelector("[data-url]").value;
  const preco = document.querySelector("[data-preco]").value;
  const descrip= document.querySelector("[data-descrip]").value;

  productoServices
    .creaProdutos(nome, url, preco, descrip)
    .then((resposta) => {
      window.location.href = "../index.html";
      console.log(resposta);
    })
    .catch((err) => {
      console.log(err);
    });
});
// comentario
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
      window.location.href = "../screens/add-products.html";
      console.log(resposta);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(pregunta);
  // document.getElementById('res').innerText = pregunta;
}

document.getElementById('enviar').addEventListener('click', enviar);