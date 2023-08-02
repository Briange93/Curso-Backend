import  express from 'express';
import routerProd from './router/product.js';
import routerCart from './router/carts.js';


// declaramos express
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/products', routerProd)
app.use('/carts', routerCart)



// confi puerto de escucha
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})