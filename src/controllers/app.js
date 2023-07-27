import  express from 'express';
import ProductManager from './ProductManager.js';

// declaramos express
const app = express();
app.use(express.json())
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
    let pid = req.params.pid;
    let totalProducts = await allProducts;
    let productById = totalProducts.find(product => product.id === pid)
    res.send(productById)

})

app.post('/products', async(req,res)=>{
    let newProduct = req.body;
    res.send(await productos.addProduct(newProduct))
})

app.delete('/products/:pid', async (req, res) => {
    let pid = req.params.pid;
    res.send(await productos.deleteProductById(pid))
})

app.put('/products/:pid', async (req,res)=>{
    let pid =req.params.pid;
    let newProduct = req.body;
    res.send(await productos.updateProduct(pid, newProduct));

})

// confi puerto de escucha
app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})