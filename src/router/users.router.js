import { Router } from "express";
import { userModel } from "../models/user.model.js";
const userRouter = Router();


userRouter.get('/', async (req,res) =>{
    try{
    let users = await userModel.find();
    //console.log(users);
    res.send({result:'success', payload: users});
    }
    catch(error){
        console.error('No se pudo obtener usuarios con mongoose'+error);
        res.status(500).send({error:'No se pudo obtener usuarios con mongoose', message: error});
    }
    })

userRouter.post('/', async (req,res) =>{
    try{
        let {first_name, last_name, email} = req.body;
        let user = await userModel.create({first_name, last_name, email});
        res.status(201).send({result:'success', payload: user});
    }
    catch(error){
        console.error('No se pudo obtener usuarios con mongoose'+error);
        res.status(500).send({error:'No se pudo crear usuario con mongoose', message: error});
    }
    })  

userRouter.put('/:id', async(req,res)=>{
    try{
        let userUpdated = req.body;
        let user = await userModel.updateOne({_id: req.params.id}, userUpdated);
        res.status(201).send(user);
    }
    catch(error){
        console.error('No se pudo obtener usuarios con mongoose'+error);
        res.status(500).send({error:'No se pudo actualizar usuario con mongoose', message: error});    
    }
})
userRouter.delete('/:id', async(req,res)=>{
    try{
        let id = req.params.id;
        let user = await userModel.deleteOne({_id: id});
        res.status(202).send({result:'success', payload: user});
    }
    catch(error){
        console.error('No se pudo obtener usuarios con mongoose'+error);
        res.status(500).send({error:'No se pudo elinminar el usuario con mongoose', message: error});    
    }
})


export default userRouter;
