import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import invoiceRouter from './routes/invoice.routes'


if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is misssing in .env');
}

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const connectDB = async () => {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB is connected to ${conn.connection.host}`);
}

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/invoice',invoiceRouter)
    
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start sever:', error);
        process.exit(1); 
    }
}

startServer();