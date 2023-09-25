// import {promises as fs} from 'fs';
// import  {nanoid}  from 'nanoid';

// export default class  ProductManager{
//     constructor(){
//         this.path= "./src/models/productos.json";
//         this.products = [];
//     }
    

//     getProduct = async()=>{
//         let lectura =  await fs.readFile(this.path,'utf-8');
//         return JSON.parse(lectura);
//     }

//     addProduct = async (product)=>{
//         let productos = await this.getProduct();
//         product.id = nanoid(5);
//         let allProducts = [...productos, product];
//         await fs.writeFile(this.path, JSON.stringify(allProducts));
//     }

//     deleteProductById= async (id)=>{
//         let lectura =  await fs.readFile(this.path,'utf-8');
//         let respuesta = JSON.parse(lectura);
//         let filterProduct = respuesta.filter(product => product.id != id)
       
//         await fs.writeFile(this.path, JSON.stringify(filterProduct))
//     }
//     updateProduct= async(id, productos)=>{
//         await this.deleteProductById(id)
//         let lectura =  await fs.readFile(this.path,'utf-8');
//         let prodSinModif = JSON.parse(lectura);
//         let prodModif = [{...productos, id: id},...prodSinModif];
//         await fs.writeFile(this.path, JSON.stringify(prodModif))

//     }  
// }

import { productModel } from "../models/products.model.js"

export default class productService {
  constructor() { 
      console.log("Working products with Database persistence in mongodb");
  }
  isThisCodeRepeated= async (code)=>{
  const listaProd=await this.getAll();
  const isCodeRepeated = listaProd.some((product) => product.code === code);
  console.log(isCodeRepeated);
  if (!isCodeRepeated) {
    return true;
    }
  }
  getAllPaginate = async (optionsQuery, options) => {
      let products = await productModel.paginate(optionsQuery,options);
       console.log(products.docs[0]);
      return products;
  }
  getAll= async () =>{
    let products = await productModel.find();
    console.log(products);
    return products;
  }
  save = async (product) => {
    console.log(`en el comienzo de save ${product.code}`);
    let validCode= await this.isThisCodeRepeated(product.code);
    if (validCode === true)
    {
      let result = await productModel.create(product);
      console.log(result);
      return result;
    }
    else
    {
      return false;
    }
  }
  update = async (id,data) =>{
    let updates= await productModel.updateOne({_id: id },data);
    return updates;  
  }
  delete = async (id) => {
    let deletes = await productModel.deleteOne({ _id: id });
    return deletes;
  }
  deleteProd= async (id, idProd) => {
    let deletes = await productModel.deleteOne ({_id:id, products_id:idProd});
  }
  getProductsByID = async (id) => {
    let product= await productModel.findOne({ _id: id });
    return product;
  }
}