
class ProductManager{
    constructor(){
        this.products=[]
    
    }
    static id=0
    addProduct(title, description, price, thumbmail, code, stock){
        ProductManager.id++
        this.products.push({title, description, price, thumbmail, code, stock, id:ProductManager.id});
    }

    getProduct(){
        return this.products
    }
}
 const productos = new ProductManager();

 console.log(productos.getProduct());

 productos.addProduct('mesa','para comer',2000,'imagen.com','abc123',10)
 productos.addProduct('silla','para sentarse',1500,'imagen2.com','abc124',20)

 console.log(productos.getProduct());