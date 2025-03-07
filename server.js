
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
 

const app = express();
connectDB();  

app.use(express.json());
app.use(cors());

app.get('/api/test', (req,res)=>{
    res.json({message: 'API FUNCIONANDO'})
})

// Importação das rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));

 