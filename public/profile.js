const socketCliente = io();

socketCliente.on("all-products", (products) => {
  console.log(products);
  updateProductList(products);
});

// Función para actualizar la lista de productos en la página web
function updateProductList (productLista) {
  let div = document.getElementById("list-products");
  let productos = "";
  console.log(`productLista : ${productLista}`);

  productLista.forEach((product) => {
    productos += `
        <article>
      <div>
        <div>
          <img src="${product.thumbnail}"  />
        </div>
        <div>
          <h2>${product.title}</h2>
          <div>
            <h2>${product.description}</h2>
          </div>
          <div>
            <h2>US$${product.price}</h2>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a href="#">Buy Now</a>
        </div>
      </div>
      
    </article>
        
        
        
        
        
        
        `;
  })
  div.innerHTML = productos};

  let form = document.getElementById("productRealTimeList");
//   form.addEventListener("submit", (evt) => {
//     evt.preventDefault();

//     let title = form.elements.title.value;
//     let description = form.elements.description.value;
//     let price = form.elements.price.value;
//     let thumbnail = [form.elements.thumbnail.value];
//     let code = form.elements.code.value;
//     let stock = form.elements.stock.value;
//     let status=true;
//     socketCliente.emit('addProduct', {
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//       status
//   });

//   form.reset();
// });

//   document.getElementById("delete-btn").addEventListener("click", function () {
//     const deleteidinput = document.getElementById("id-prod");
//     const deleteid = parseInt(deleteidinput.value);
//     socketCliente.emit("deleteProduct", deleteid);
//     deleteidinput.value = "";
//   });
// socketCliente.on("productosupdated", (obj) => {
//   updateProductList(obj);
// });