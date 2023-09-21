import {Router} from "express";
import productService from "../controllers/ProductManager.js";
import { Server } from "socket.io";

const socket = new Server();
const routerProd = Router();
const manager = new productService();



routerProd.get('/api/products', async (req, res) => {
  try {
    // const { limit } = req.query;
    // let productsList = await manager.productList(); // Obtener la lista de productos primero

    // if (limit) {
    //   let newProducts = productsList.slice(0, limit); // Recortar la lista si se proporciona el límite
    //   productsList = newProducts; // Asignar la nueva lista recortada
    // }
    const { limit, page, sort, query, availability } = req.query;

    const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
    };
        
    const optionsQuery = {};
        
    if (query) {
      optionsQuery.title = { $regex: new RegExp(query, "i") };
    }
        
    const availabilityMap = {
      available: true,
      unavailable: false,
    };
        
    if (availability in availabilityMap) {
      optionsQuery.status = availabilityMap[availability];
    }
        
    const sortMap = {
      asc: 1,
      desc: -1,
    };
        
    if (sort in sortMap) {
      options.sort = { price: sortMap[sort] };
    }
        
    const result = await manager.getAll(optionsQuery, options);
        
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
  }
});

// GET NORMAL PARA PRUEBAS
routerProd.get('/api/products', async (req, res) => {
  try {
    const result = await manager.getAllPaginate();  
    res.send({ status: "success", payload: result });
  }
  catch{
    res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
  }
})
routerProd.post('/api/products', async (req, res) => {
  try {
    //para agregar un nuevo producto colocar id=0 y se autogenera un id
    let productToAdd = req.body;
    // console.log(productToAdd);
    if (!('status' in productToAdd)) {
      productToAdd.status = true;
    }
    // let status = await manager.createProduct(productToAdd.title,productToAdd.description,productToAdd.price,productToAdd.thumbnail,productToAdd.code,
    //   productToAdd.stock,productToAdd.status,productToAdd.id);
    let product = await manager.save(productToAdd);
    // socket.emit('change');
    if (product){
      res.send({status: "success", payload: product });
    }else{
      res.send({status: "failure invalid code"})
    }
  } catch (error) {
    res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
  }
});

routerProd.get('/api/products/:pid', async (req, res) => {
    const {pid} = req.params;
    console.log(`pid: ${pid}`);
    const product = await manager.getProductsbyID(parseInt(pid));
    if(product) {
      res.send({status: "success", payload: product });
    }else {
      res.status(404).json({'error': 'Producto no encontrado'});
    }
});

routerProd.put('/api/products/:pid', async (req, res) => {
    const {pid} = req.params;
    let productToUpdate = req.body;
    let p = await manager.update(pid,productToUpdate);
    if(p) {
        res.send({status: "success", payload: p });
      }else {
        res.status(404).json({'error': 'Producto no encontrado'});
    }
})

routerProd.delete('/api/products/:pid', async (req, res) => {
  const {pid} = req.params;
  let p = await manager.delete(pid);
  socket.emit('change');
  if(p) {
    res.send({status: "success", payload: p });
  }else {
    res.status(404).json({'error': 'Producto no encontrado'});
  }
})

export default routerProd;