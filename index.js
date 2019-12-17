import express from 'express';
import calculadora from './calculadora';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/calculadora', calculadora); 

      //MIDDLEWARES
   

  //MIDDLEWARES
 
app.get('/', (req, res) => {
    res.send('Hello World!');
  });  

  app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));
  
  app.listen(3000, () => 
    console.log('Example app listening on port 3000!'),
  ); 