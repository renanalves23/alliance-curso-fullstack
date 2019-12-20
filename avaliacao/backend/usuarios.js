import {Router} from 'express';
import { Client } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    let resultado = [];
    const client = criaClient();

    await client.connect();
    let queryResult = await client.query("select CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS from public.USUARIOS");
    for (let row of queryResult.rows) {
        resultado.push({
            codigo: row.codigo,
            nome: row.nome,
            telefone: row.telefone,
            email: row.email,
            saldoCreditos: row.saldo_creditos
        });
        console.log(resultado[-1]);
    }
    await client.end();

    res.send(JSON.stringify(resultado));
});

// Entrada é:
// payload = {nome: string, telefone: string, email: string, saldoCreditos: numerico}
router.post('/', async (req, res) => {
    let payload = req.body;
    let sql = `insert into USUARIOS(CODIGO, NOME, TELEFONE, EMAIL, SALDO_CREDITOS) VALUES
    (nextval('usuarios_sequence'),'${payload.nome}','${payload.telefone}','${payload.email}', ${payload.saldoCreditos})
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(201);
    res.send();
})

// Entrada é:
// payload = {nome: string, telefone: string, email: string, saldoCreditos: numerico}
router.put('/:codigo', async (req, res) => {
    let codigo = req.params.codigo;
    let payload = req.body;

    let sql = `update USUARIOS SET
        NOME = '${payload.nome}',
        TELEFONE = '${payload.telefone}',
        EMAIL = '${payload.email}',
        SALDO_CREDITOS = ${payload.saldoCreditos}
    where
        CODIGO = ${codigo}
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
})

router.delete('/:codigo', async (req, res) => {
    let codigo = req.params.codigo;

    let sql = `delete from USUARIOS
    where
        CODIGO = ${codigo}
    `;

    const client = criaClient();
    await client.connect();
    await client.query(sql);
    await client.end();

    res.status(204);
    res.send();
});

function criaClient() {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_dia3',
        password: '123456',
        port: 5432
    });
}

export default router;