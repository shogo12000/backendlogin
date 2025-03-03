import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexão ao MongoDB bem-sucedida!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);  
    }
};

export default connectDB;
