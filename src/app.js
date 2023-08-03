import  express from 'express';
import {engine} from 'express-handlebars'
import routerProd from './router/product.js';
import routerCart from './router/carts.js';
import __dirname from './utils.js';
import * as path from 'path';
import ProductManager from './controllers/ProductManager.js';

const products = new ProductManager;
// declaramos express
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'))

app.use('/', express.static(__dirname + '/public'))
app.use('/products', routerProd)
app.use('/carts', routerCart)

app.get('/', async(req,res)=>{
    let allProducts = await products.getProduct();
    res.render("home",{
        title: 'Productos',
        productos : allProducts
    })
})


// confi puerto de escucha
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})