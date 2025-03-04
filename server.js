 
 
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
 

const app = express();

app.use(cors());
app.use(express.json());

 
 

app.get('/', (req, res) => {
    console.log("funcionando")
 
    res.send('Backend funcionando no Vercel! ' );
});

app.get('/teste', (req, res) => {
    res.send('Teste funcionando!');
});

 

module.exports = app;
module.exports.handler = serverless(app);



if (require.main === module) {
    const PORT = 4000; // Escolha uma porta para o servidor local
    app.listen(PORT, () => {
        console.log(`Servidor rodando localmente em http://localhost:${PORT}`);
    });
}