import {Router} from 'express';
import ProductManager from '../controllers/ProductManager.js';

const productos = new ProductManager();

const routerProd = Router();

const allProducts = productos.getProduct();
routerProd.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit)
    if(!limit)return res.send(await allProducts);
    let totalProducts = await allProducts;
    let productLimit = totalProducts.slice(0,limit)
    res.send(productLimit);
 })
 
 routerProd.get('/:pid', async (req, res) => {
     let pid = req.params.pid;
     let totalProducts = await allProducts;
     let productById = totalProducts.find(product => product.id === pid)
     res.send(productById)
 })
 
 routerProd.post('/', async(req,res)=>{
     let newProduct = req.body;
     res.send(await productos.addProduct(newProduct))
 })
 
 routerProd.delete('/:pid', async (req, res) => {
     let pid = req.params.pid;
     res.send(await productos.deleteProductById(pid))
 })
 
 routerProd.put('/:pid', async (req,res)=>{
     let pid =req.params.pid;
     let newProduct = req.body;
     res.send(await productos.updateProduct(pid, newProduct));
 
 })

 export default routerProd