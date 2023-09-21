import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado este sitio un total de ${req.session.counter} veces`);
    }
    else
    {
        req.session.counter=1;
        res.send(`Bienvenido al sitio`);
    }
});

export default router;