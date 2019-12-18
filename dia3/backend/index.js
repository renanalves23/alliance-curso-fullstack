//import express, { Router } from 'express';
import express from 'express';
import cors from 'cors';

import usuarios from './usuarios';

import bicicletas from './bicicletas';

const app = express();

   //NESSA ORDEM
app.use(cors());
app.use(express.json());
app.use('/usuarios', usuarios);
app.use('/bicicletas', bicicletas);
//NESSA ORDEM


      //MIDDLEWARES
   

  //MIDDLEWARES
 
app.get('/', (req, res) => {
    res.send('Hello World!')
  });  

  
  app.listen(3000, () => 
    console.log('Example app listening on port 3000!'),
  ); 

 