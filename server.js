import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import serverless from 'serverless-http';

const app = express();

// 🔹 Lista de origens permitidas
const allowedOrigins = ['http://localhost:5174', 'https://backendlogin-delta.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        console.log("🔍 Origem da requisição:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('🚫 Origem não permitida pelo CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// 🔹 Middleware CORS (adicionado antes das rotas)
app.use(cors(corsOptions));

// 🔹 Middleware para permitir preflight requests (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// 🔹 Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// 🔹 Importação das rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
    try {
        console.log('🔄 Tentando conectar ao banco...');
        await connectDB();
        console.log('✅ Banco de dados conectado com sucesso!');
        console.log('🚀 Servidor inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar ao banco:', error);
        process.exit(1);
    }
};

// 🔹 Inicia o servidor
startServer();

// 🔹 Exportação para AWS Lambda
export default serverless(app);

