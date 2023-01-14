  //GET
const listaProductos = () =>
  fetch("http://localhost:3000/producto")
    .then((resposta) => resposta.json())
    .catch((error) => console.log(error));

const listarUnProduto = (id) => {
  return fetch(`http://localhost:3000/producto/${id}`).then((resposta) => {
    return resposta.json();
  });
};

// mensajes
  //GET
//   const listaMesajes = () =>
//   fetch("http://localhost:3000/prod")
//     .then((resposta) => resposta.json())
//     .catch((error) => console.log(error));

// const listarUnMensaje = (id) => {
//   return fetch(`http://localhost:3000/prod/${id}`).then((resposta) => {
//     return resposta.json();
//   });
// };

//POST
const creaProdutos = (name, imageUrl, price, description) => {
  return fetch(`http://localhost:3000/producto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      price,
      description
    }),
  }).then((resposta) => {
    if (resposta.ok) {
      return resposta.body;
    }
    throw new Error("Não foi possível criar um produto");
  });
};

// PUT/PATCH
const alteraProduto = async (id, name, price, description) => {
  return fetch(`http://localhost:3000/producto/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      description,
    }),
  })
    .then((resposta) => {
      return resposta.json();
    })
    .catch((error) => console.log(error));
};

// DELETE
const deleteProducto = async (id) => {
  return await fetch(`http://localhost:3000/producto/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//POST
const creaMensje = (name, mensaje,respuesta) => {
  // http://localhost:3000/prod retomo todo el json en lista
  return fetch(`http://localhost:3000/prod`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      
      respuesta,
      mensaje,
    }),
  }).then((resposta) => {
    if (resposta.ok) {
      return resposta.body;
    }
    throw new Error("Não foi possível criar um produto");
  });
};

export const productoServices = {
  listaProductos,
  listarUnProduto,
  creaProdutos,
  alteraProduto,
  deleteProducto,
  // listaMesajes,
  // listarUnMensaje,
  creaMensje,

};
