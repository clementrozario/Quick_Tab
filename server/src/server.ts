import express from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome to Quick tab your one solution for invoice')
})

app.listen(PORT, () => {
    console.log(`server is running on port:${PORT}`);
})
