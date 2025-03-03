import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverless from 'serverless-http';

const app = express();

// Definindo as opções do CORS
const corsOptions = {
    origin: '*', // Permitir qualquer domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Middleware para timeout
app.use((req, res, next) => {
    res.setTimeout(30000, () => { // Timeout de 30 segundos
        console.log('Tempo limite de requisição excedido');
        res.status(504).send('Gateway Timeout');
    });
    next();
});

const startServer = async () => {
    try {
        await connectDB();

        app.use(express.json());
        app.use(cors(corsOptions));

        // Importação das rotas
        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);

        console.log('✅ Servidor inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco:', error);
        process.exit(1);
    }
};

// Inicia o servidor
startServer();

// Exportação para AWS Lambda
export const handler = serverless(app);
