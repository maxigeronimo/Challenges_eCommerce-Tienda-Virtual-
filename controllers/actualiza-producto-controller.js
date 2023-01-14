import { productoServices } from "../servicios/producto-servicios.js";

const getURL = new URL(window.location);

const id = getURL.searchParams.get("id");

const inputImageUrl = document.querySelector("[data-url]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputDescripcion = document.querySelector("[data-descripcion]");

productoServices.listarUnProduto(id).then((datos) => {
  inputImageUrl.setAttribute("src", datos.imageUrl);
  inputNombre.value = datos.name;
  inputPrecio.value = datos.price;
  inputDescripcion.value = datos.description;
});

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  productoServices
    .alteraProduto(
      id,
      inputNombre.value,
      inputPrecio.value,
      inputDescripcion.value
    )
    .then(() => {
      window.location.href = "../screens/produto.html";
    });
});

// Comentario
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
      window.location.href = "../screens/edit-product.html";
      console.log(resposta);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(pregunta);
  // document.getElementById('res').innerText = pregunta;
}

document.getElementById('enviar').addEventListener('click', enviar);