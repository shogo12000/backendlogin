import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverless from 'serverless-http';

const app = express();

const allowedOrigins = ['http://localhost:5174', 'https://backendlogin-delta.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const startServer = async () => {
    try {
        console.log('Tentando conectar ao banco...');
        await connectDB();
        console.log('Banco de dados conectado com sucesso!');
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
export default serverless(app);

