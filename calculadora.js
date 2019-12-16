import { Router }  from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.send("Olá");
});

router.post('/', (req, res) => {
    let operando1 = req.body.operando1;
    let operando2 = req.body.operando2;
    let operador = req.body.operador;

    let resultado;
    if (operador == '+') resultado = operando1 + operando2;
    else if (operador == '-') resultado = operando1 - operando2;
    else if (operador == '*') resultado = operando1 * operando2;
    else if (operador == '/') resultado = operando1 / operando2;

    res.status = 200;
    res.send(JSON.stringify({resultado}));
});

export default router;