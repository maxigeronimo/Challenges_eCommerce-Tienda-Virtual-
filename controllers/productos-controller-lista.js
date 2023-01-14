import { productoServices } from "../servicios/producto-servicios.js";
import { formatPrice } from "../formatterPrices.js";
const nuevoProduto = (name, price, imageUrl, id) => {
  const card = document.createElement("div");
  const contenido = `
        <div class="sessao-produtos">
           <ul class="card">
            <li><img class="card__image" src="${imageUrl}" alt="Imagen producto">
            </li>
            <li class="product-name">${name}</li>
            <li class="preco">${formatPrice(price)}</li>
            <li><p class="component__card__cod">#00${id}</p></li>
          </ul>
        </div>`;
  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

const productos = document.querySelector("[data-product]");

const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();
    listaProductos.forEach((elemento) => {
      productos.appendChild(
        nuevoProduto(
          elemento.name,
          elemento.price,
          elemento.imageUrl,
          elemento.id
        )
      );
    });
  } catch (erro) {
    console.log(erro);
  }
};

render();

// let input = getElementById("inputID");

// Obtener el valor del placeholder
// let placeholder = input.placeholder;

// Establecer un nuevo valor
// input.placeholder = "Aquí el nuevo valor para el placeholder";

// const Productos = [
//   { nombre: "Platanos", Valor: 500 },
//   { nombre: "Pera", Valor: 500 },
//   { nombre: "Sandia", Valor: 500 },
//   { nombre: "Melon", Valor: 500 },
//   { nombre: "Frutillas", Valor: 500 },
// ];

// obtengo los elemento de los productos
// document.querySelector("#botonJason").addEventListener("click", traerDatos);
let array = [];
// function traerDatos() {
// console.log('desntro de la funcion')
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "../db.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let datos = JSON.parse(this.responseText)["producto"];
    let res = document.querySelector("#res");
    res.innerHTML = "";
    // for (const key in datos) {
    //   if (Object.hasOwnProperty.call(datos, key)) {
        // console.log(datos[key]);

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
                <div class="sessao-produtos">
                    <div class="container">
                        <button class="deleteImage" type="button"  id="borrar">
                          <img class="buttonDelete" src="../assets/delete.png" alt="Deletar" />
                        </button>
                        
                        <a  href="../screens/edit-product.html?id=${prod.id}">
                        
                          <button class="editImage bg-primary" type="button">
                            <img class="buttonEdit" src="../assets/edit.png" alt="Editar" />
                          </button>
                        
                        </a>
                    </div>
        <ul class="card">
         <li><img class="card__image" src="${prod.imageUrl}" alt="Imagen producto">
         </li>
         <li class="product-name">${prod.name}</li>
         <li class="preco">${formatPrice(prod.price)}</li>
         <li><p class="component__card__cod">#00${prod.id}</p></li>
       </ul>
     </div>
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

          // res.innerHTML += `
          // <tr>
          //     <th>${iterator["name"]}</th>
          //     <th>${iterator["price"]}</th>
          // </tr>
          // `;
        }
    //   }
    // }
  }
};
// }


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
      window.location.href = "../screens/index.html";
      console.log(resposta);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(pregunta);
  // document.getElementById('res').innerText = pregunta;
}

document.getElementById('enviar').addEventListener('click', enviar);