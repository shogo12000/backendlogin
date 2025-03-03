import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverless from 'serverless-http';

const app = express();

const corsOptions = {
    origin: '*', // Permitir apenas este domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  };

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