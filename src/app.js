import  express from 'express';
import {engine} from 'express-handlebars'
import routerProd from './router/product.js';
import routerCart from './router/carts.js';
import __dirname from '../utils.js';
import * as path from 'path';
import productService from './controllers/ProductManager.js';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import userRouter from './router/users.router.js';
import { userModel } from './models/user.model.js';
import sessionsRouter from './router/sessions.router.js'
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import viewRout from './router/views.router.js';

const products = new productService();

// declaramos express
const app = express();
const PORT = 8080;
// confi puerto de escucha con websocket
const server = app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})
const io = new Server(server);

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'))
app.use('/', express.static(__dirname + '/public'))

const DB = 'mongodb+srv://BrianGe93:Lmtlosamo22@cluster0.5dmquxe.mongodb.net/BackendProyect?retryWrites=true&w=majority';


// SESSIONS 
app.use(session({
 
  store: MongoStore.create({
      mongoUrl: DB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60
  }),


  secret: "coderS3cr3t",
  resave: true,
  saveUninitialized: true
}));
app.use('/', viewRout);
app.use('/products', routerProd);
app.use('/carts', routerCart);
app.use('/api/users', userRouter);
app.use('/api/sessions',sessionsRouter);
app.get('/', async(req,res)=>{
    let allProducts = await products.getAll();
    res.render("home",{
        title: 'Productos',
        listaproductos : allProducts
    })
})
app.get('/api/products', async(req,res)=>{
    let allProducts = await products.getAll();
    console.log(allProducts);
    res.render("realTimeProducts",{
        title: 'Productos',
        products : allProducts
    })
})
app.get("/productsHandlerWebSockets", (req, res) => {
    res.render("productsHandlerWebSockets", {});
})
io.on('connection',async (socket) =>{
    console.log('Conectado con Web Socket');
    socket.emit("updateProductsRealTime",await products.getAll())
    
    socket.on("createProduct",async  data => {
        let productCreated =await products.save(data)
        socket.emit("createProductMessage",productCreated )
        socket.emit("updateProductsRealTime",products.getAll())
    })

    socket.on("updateProduct",async data => {
        let messageUpdated =await products.update(data.id, data.data)
        socket.emit("updateProductMessage",messageUpdated )
        socket.emit("updateProductsRealTime",products.getAll())
    })

    socket.on("deleteProduct",async data => {
        let messageDeleted =await products.delete(data);
        socket.emit("deleteProductMessage",messageDeleted )
        socket.emit("updateProductsRealTime",products.getAll())
    })
})


const MongoConnect = async()=>{
    try{
        await mongoose.connect(DB);
        console.log('conectado con exito a mongo');
        let response = await userModel.find().explain('executionStats')
        //console.log(response);
    }
    catch(error){
                console.error('No se pudo conectar con Mongo'+ error);
                process.exit();
    }
}
MongoConnect();


