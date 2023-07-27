
import {promises as fs} from 'fs';
import  {nanoid}  from 'nanoid';

export default class  ProductManager{
    constructor(){
        this.path= "./src/models/productos.json";
        this.products = [];
    }
    

    getProduct = async()=>{
        let lectura =  await fs.readFile(this.path,'utf-8');
        return JSON.parse(lectura);
    }

    addProduct = async (product)=>{
        let productos = await this.getProduct();
        product.id = nanoid(5);
        let allProducts = [...productos, product];
        await fs.writeFile(this.path, JSON.stringify(allProducts));
    }

    deleteProductById= async (id)=>{
        let lectura =  await fs.readFile(this.path,'utf-8');
        let respuesta = JSON.parse(lectura);
        let filterProduct = respuesta.filter(product => product.id != id)
       
        await fs.writeFile(this.path, JSON.stringify(filterProduct))
    }
    updateProduct= async(id, productos)=>{
        await this.deleteProductById(id)
        let lectura =  await fs.readFile(this.path,'utf-8');
        let prodSinModif = JSON.parse(lectura);
        let prodModif = [{...productos, id: id},...prodSinModif];
        await fs.writeFile(this.path, JSON.stringify(prodModif))

    }  
}

