import express from 'express';
import calculadora from './calculadora';

const app = express();

app.use(express.json());
app.use('/calculadora', calculadora); 
 
app.get('/', (req, res) => {
    res.send('Hello World!');
  });  
  
  app.listen(3000, () => 
    console.log('Example app listening on port 3003!'),
  ); 