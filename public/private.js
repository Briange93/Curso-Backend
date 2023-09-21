const socketCliente = io();

let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let price = form.elements.price.value;
    let thumbnail = [form.elements.thumbnail.value];
    let code = form.elements.code.value;
    let stock = form.elements.stock.value;
    let status=true;
    socketCliente.emit('addProduct', {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status
  });

  form.reset();
});

  document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    socketCliente.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });