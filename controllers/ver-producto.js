import { productoServices } from "../servicios/producto-servicios.js";
import { formatPrice } from "../formatterPrices.js";
// producto seleccionado
const getURL = new URL(window.location);

const id = getURL.searchParams.get("id");

const inputImageUrl = document.querySelector("[data-url]");
const inputNombre = document.querySelector("[data-nombre]");
const inputPrecio = document.querySelector("[data-precio]");
const inputDescripcion = document.querySelector("[data-descripcion]");
// console.log(inputPrecio.value);
const render = async () => {
  try {
    productoServices.listarUnProduto(id).then((datos) => {
      inputImageUrl.setAttribute("src", datos.imageUrl);
      inputNombre.value = datos.name;
      inputPrecio.value = "$" + datos.price;
      inputDescripcion.value = datos.description;
    });
  } catch (erro) {
    console.log(erro);
  }
};
render();

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

// Establecer un nuevo valor
// input.placeholder = "Aquí el nuevo valor para el placeholder";

let array = [];
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "../db.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let datos = JSON.parse(this.responseText)["producto"];
    let res = document.querySelector("#res");
    res.innerHTML = "";

    for (const iterator of datos) {
      const formulario = document.querySelector("#formularioj");
      const boton = document.querySelector("#botonj");
      const result = document.querySelector("#resultadoj");
      const filtrar = () => {
        // console.log(formulario.value);
        // actualizo antes de ingresar un producto
        result.innerHTML = "";
        // encuentro el producto
        const texto = formulario.value.toLowerCase();

        for (let prod of array) {
          let Nombre = prod.name.toLocaleLowerCase();

          if (Nombre.indexOf(texto) != -1) {
            result.innerHTML += `
                
                  <ul class="card">
                    <li><img class="card__image" src="${
                      prod.imageUrl
                    }" alt="Imagen producto">
                    </li>
                    <li class="product-name">${prod.name}</li>
                    <li class="preco">${formatPrice(prod.price)}</li>
                    <li><a class="ver-produto" href="verProducto.html?id=${
                      prod.id
                    }">Ver Producto</a></li>
                  </ul>
        
                `;
          }
        }
        if (result.innerHTML == "") {
          result.innerHTML += `
              <li>Producto NO Encontrado...</li>
              `;
        }
      };
      boton.addEventListener("click", filtrar);
      // busca en todo momento dentro de los elementos
      formulario.addEventListener("keyup", filtrar);

      filtrar();
      array.push(iterator);
    }
  }
};
