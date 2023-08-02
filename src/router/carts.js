import {Router} from 'express';
import CartManager from '../controllers/CartManager.js';

const routerCart = Router();
const carts = new CartManager;
const allCarts = carts.getCarts();

routerCart.get('/', async (req,res)=>{
    res.send(await carts.getCarts())
})

routerCart.get('/:cid', async (req, res) => {
    let cid = req.params.cid;
    let totalCarts = await allCarts;
    let cartById = totalCarts.find(cart => cart.id === cid)
    res.send(cartById)
})

routerCart.post('/', async (req,res)=>{
    res.send(await carts.addCarts())
})

routerCart.post('/:cid/products/:pid', async (req,res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    res.send(await carts.addProductToCart(cid,pid))
})




export default routerCart;