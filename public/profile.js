const socketCliente = io();

socketCliente.on("all-products", (products) => {
  console.log(products);
  updateProductList(products);
});

// Función para actualizar la lista de productos en la página web
function updateProductList(productLista) {
  let div = document.getElementById("list-products");
  let productos = "";

  productLista.forEach((product) => {
    productos += `
      <article>
        <div>
          
          <div>
            <h2>${product.title}</h2>
            <div>
              <p>${product.description}</p>
            </div>
            <div>
              <p>$${product.price}</p>
            </div>
            <div>
              <button class="btnAddProduct" data-product-id="${product._id}">Agregar al carrito</button>
            </div>
            <div>
              <button class="btnVerMas" data-product-id="${product._id}">VER MAS...</button>
            </div>
          </div>
        </div>
      </article>`;
  });

  div.innerHTML = productos;

  // Agregar evento click a los botones "Agregar al carrito"
  const btnsAgregarProducto = document.querySelectorAll(".btnAddProduct");
  btnsAgregarProducto.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const productId = btn.getAttribute("data-product-id");
      console.log(`Agregando producto con ID ${productId} al carrito`);
      socketCliente.emit('addNewProduct', productId);
    });
  });

  // Agregar evento click a los botones "VER MAS..."
  const btnsVerMas = document.querySelectorAll(".btnVerMas");
  btnsVerMas.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const productId = btn.getAttribute("data-product-id");
      // Lógica para mostrar más detalles del producto usando el productId
      console.log(`Mostrando detalles del producto con ID ${productId}`);
    });
  });
}
