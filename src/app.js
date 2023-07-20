import  express from 'express';
import ProductManager from './ProductManager.js';


// declaramos express
const app = express();
app.use(express.urlencoded({extended:true}));
const productos = new ProductManager();

const allProducts = productos.getProduct();



const PORT = 8080;

// endpoint - nuetra API
app.get('/products', async (req, res) => {
   let limit = parseInt(req.query.limit)
   if(!limit)return res.send(await allProducts);
   let totalProducts = await allProducts;
   let productLimit = totalProducts.slice(0,limit)
   res.send(productLimit);
})

app.get('/products/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let totalProducts = await allProducts;
    let productById = totalProducts.find(product => product.id === pid)
    res.send(productById)

})

// confi puerto de escucha
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})