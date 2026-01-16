import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use(cookieParser())

const connectDB = async () => {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB is connected to ${conn.connection.host}`);
}

app.use('/api/auth',authRouter)
    
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