import express from 'express';
import calculadora from './calculadora';

const app = express();

app.use(express.json());
app.use('/calculadora', calculadora); 
 
app.get('/', (req, res) => {
    res.send('Hello World!');
  });  

  app.get('/axios.js', (req, res) => res.sendFile(__dirname + '/axios.js'));
  
  app.listen(3000, () => 
    console.log('Example app listening on port 3000!'),
  ); 