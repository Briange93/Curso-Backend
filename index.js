
const { log } = require('console')
const fs= require('fs');
const { json } = require('stream/consumers');
class ProductManager{
    constructor(){
        this.path= "./productos.json";
        this.products = [];
    }
    static id=0
    addProduct = async (title, description, price, thumbmail, code, stock)=>{
        ProductManager.id++
        let product = {title, description, price, thumbmail, code, stock, id:ProductManager.id};
        this.products.push(product);
    
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }
    

    getProduct = async()=>{
        let lectura =  await fs.promises.readFile(this.path,'utf-8');
        console.log(JSON.parse(lectura));
    }

    getProductById= async (id)=> {
        let lectura =  await fs.promises.readFile(this.path,'utf-8');
        let respuesta = JSON.parse(lectura);
        if(!respuesta.find(product => product.id === id)){
            console.log('producto no encontrado')
        }else{
        let lecturaById = respuesta.find(product => product.id === id);
        console.log(lecturaById);}
    }
    deleteProductById= async (id)=>{
        let lectura =  await fs.promises.readFile(this.path,'utf-8');
        let respuesta = JSON.parse(lectura);
        let filterProduct = respuesta.filter(product => product.id != id)
       

        //console.log(filterProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(filterProduct))
    }
    updateProduct=async({id, ...productos})=>{
        await this.deleteProductById(id)
        let lectura =  await fs.promises.readFile(this.path,'utf-8');
        let prodSinModif = JSON.parse(lectura);
        let prodModif = [{...productos, id},...prodSinModif];
        await fs.promises.writeFile(this.path, JSON.stringify(prodModif))

    }  
}

 const productos = new ProductManager();


;

 //productos.addProduct('mesa','para comer',2000,'imagen.com','abc123',10)
 //productos.addProduct('silla','para sentarse',1500,'imagen2.com','abc124',20)
 //productos.addProduct('Cama','para acostarse',10000,'imagen3.com','abc125',30)
 //productos.getProduct();
 //productos.getProductById(3);
 //productos.deleteProductById(2);
 productos.updateProduct({"title":"silla","description":"para sentarse","price":2500,"thumbmail":"imagen2.com","code":"abc124","stock":20,"id":2})
