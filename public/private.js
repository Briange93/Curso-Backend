const socket = io();

const createProductButton = document.getElementById("createProduct");
const updateProductButton = document.getElementById("updateProduct");
const deleteProductButton = document.getElementById("deleteProduct");
const message = document.getElementById("message")

socket.on("createProductMessage",data => {

        updateMessage("Producto creado correctamente!")
    
})

socket.on("updateProductMessage", data => {
        
        updateMessage("Producto actualizado correctamente!")
})

socket.on("deleteProductMessage", data => {
        
        updateMessage("Producto eliminado correctamente!")
})


createProductButton.onclick = () => {
    let data = getFormData(); 
    socket.emit("createProduct",data);
    updateMessage("Producto creado")

}
updateProductButton.onclick = () => {
    let data = getFormData();
    let id = document.getElementById("productId").value;
    if (id) {
        socket.emit("updateProduct",{id, data});
    }else{
        updateMessage("No puede estar el ID vacio")
    }
}
deleteProductButton.onclick = () => {
    let id = document.getElementById("productId").value;
    if (id) {
        socket.emit("deleteProduct",id);
    }else{
        updateMessage("No puede estar el ID vacio")
    }
}

function getFormData(){
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let code = document.getElementById("code").value;
    let price = parseInt(document.getElementById("price").value);
    let stock = parseInt(document.getElementById("stock").value);

    return {title,description,code,price,status: true,stock}
}

function updateMessage(messages){
    message.innerHTML = messages
}
