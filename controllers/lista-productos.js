import { productoServices } from "../servicios/producto-servicios.js";
import { formatPrice } from "../formatterPrices.js";

const getProducts = (name, price, imageUrl, id) => {
  const card = document.createElement("div");

  const contenido = `
      <div class="sessao-produtos">
        <div class="container">
            <button class="deleteImage" type="button"  id="borrar">
              <img class="buttonDelete" src="../assets/delete.png" alt="Deletar" />
            </button>
            
            <a  href="../screens/edit-product.html?id=${id}">
            
              <button class="editImage bg-primary" type="button">
                <img class="buttonEdit" src="../assets/edit.png" alt="Editar" />
              </button>
            
            </a>
        </div>
        <ul class="card">
         <li><img class="card__image" src="${imageUrl}" alt="Imagen producto">
         </li>
         <li class="product-name">${name}</li>
         <li class="preco">${formatPrice(price)}</li>
         <li><p class="component__card__cod">#00${id}</p></li>
       </ul>
     </div>
    `;
  card.innerHTML = contenido;
  card.dataset.id = id;
  return card;
};

const productos = document.querySelector("[data-allProducts]");

productos.addEventListener("click", async (evento) => {
  let deleteButton = evento.target.className === "buttonDelete";
  if (deleteButton) {
    const producto = evento.target.closest("[data-id]");
    let id = producto.dataset.id;
    productoServices
      .deleteProducto(id)
      .then((res) => {
        producto.remove();
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
});

const render = async () => {
  try {
    const listaProductos = await productoServices.listaProductos();

    listaProductos.forEach((producto) => {
      productos.appendChild(
        getProducts(
          producto.name,
          producto.price,
          producto.imageUrl,
          producto.id
        )
      );
    });
  } catch (err) {
    console.log(err);
  }
};

render();

// const renderer = async () => {
//   try {
//     const listaMesajes = await productoServices.listaMesajes();

//     listaMesajes.forEach((product) => {
//       productos.appendChild(
//         getProducts(
//           product.name,
//           product.price,
//           product.imageUrl,
//           product.id
//         )
//       );
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
// renderer();