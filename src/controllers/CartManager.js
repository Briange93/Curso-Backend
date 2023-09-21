// import {promises as fs} from 'fs';
// import  {nanoid}  from 'nanoid';
// import ProductManager from './ProductManager.js';

// const productos = new ProductManager;

// export default class CartManager {
//     constructor(){
//         this.path = "./src/models/carts.json"
//     }
//     getCarts = async () =>{
//         let carts= await fs.readFile(this.path, 'utf-8');
//         return JSON.parse(carts);
//     }
    
//     writeCarts = async(carts) =>{
//         await fs.writeFile(this.path, JSON.stringify(carts));
//     }

//     addCarts = async() =>{
//         let carts = await this.getCarts();
//         let id = nanoid(5);
//         let allCarts =[{id:id, products:[]},...carts];
//         await this.writeCarts(allCarts);
//         return 'Carrito agregado';
//     }

//     addProductToCart = async(cid,pid)=>{
//         let allCarts = await this.getCarts();
//         let allProducts= await productos.getProduct();
//         let productById = await allProducts.find(prod => prod.id === pid)
//         let cartById = await allCarts.find(cart=> cart.id === cid)
//         let filterCart = allCarts.filter(cart => cart.id !=cid)
//         if(cartById.products.some(prod => prod.id === pid)){
//             let prodInCart = cartById.products.find(prod => prod.id === pid)
//             prodInCart.quantity++
//             let cartConcat = [cartById,...filterCart];
//             await this.writeCarts(cartConcat)
//             return 'Producto sumado al carrito'
//         }
//         let cartConcat = [{id:cid, products : [{id:productById.id, quantity:1}]},...filterCart]
//         await this.writeCarts(cartConcat);
//         return 'Producto agregado al carrito'
//     }
// }

import { cartModel } from "../models/carts.model.js";

export default class cartService {
  constructor() { 
      console.log("Working carts with Database persistence in mongodb");
  }

  getAll = async () => {
      let carts = await cartModel.find();
      return carts.map(course=>course.toObject());
  }
  save = async () => {
      let result = await cartModel.create();
      return result;
  }
  update = async (id, data) => {
    try {
      const conditions = { _id: id }; // Condiciones de búsqueda
      const update = { $set: { products: data } }; // Actualización
  
      const result = await cartModel.updateOne(conditions, update);
      
      return result;
    } catch (err) {
      console.error('Error al actualizar el documento:', err);
    }
  };
  getCartbyID= async (id)=>{
    let cart= await cartModel.findOne({ _id: id });
    return cart;
  }
  delete = async (id) => {
    let deletes= await cartModel.deleteOne({ _id: id });
    return deletes;
  }
  deleteProd = async (cartID, productID) => {
    const cart = await this.getCartbyID(cartID);
    console.log(cart);
    if (!cart) {
      return { error: 'Carrito no encontrado' };
    }
  
    // Definir products como un array vacío
    const products = [];
  
    cart.products = cart.products.filter(product => product._id.toString() !== productID);
    
    cart.products.forEach(product => {
      products.push(product._id);
    });
  
    const changes = await this.update(cartID, JSON.stringify(products));
    return changes;
  }
}