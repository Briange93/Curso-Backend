const socket = io();

socket.on("updateProductsRealTime", data => {
    let products = data;
    let productList = document.getElementById("productRealTimeList");
    productList.innerHTML = "";
    products.forEach(product => {
        productList.innerHTML += `
        <div class="productRealTimeItem"> 
            <p>Titulo: ${product.title}</p>
            <p>Descripción: ${product.description}</p>
            <p>Codigo: ${product.code}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: ${product.stock} </p>
            <p>ID: ${product.id}</p>
        </div>
        `
    });

})