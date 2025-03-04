import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverless from 'serverless-http';

const app = express();

const corsOptions = {
    origin:  '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get('/test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: 'CORS está funcionando!' });
});
// const startServer = async () => {
//     try {
//         console.log('Tentando conectar ao banco...');
//         await connectDB();
//         console.log('Banco de dados conectado com sucesso!');
//         app.use(express.json());
//         app.use(cors(corsOptions));

//         // Importação das rotas
//         app.use('/api/auth', authRoutes);
//         app.use('/api/users', userRoutes);

//         console.log('✅ Servidor inicializado com sucesso!');


//     } catch (error) {
//         console.error('Erro ao conectar ao banco:', error);
//         process.exit(1);
//     }
// };

// // Inicia a conexão com o banco de dados
// startServer();

// Exporta a aplicação para Vercel (sem app.listen)
export default serverless(app);
