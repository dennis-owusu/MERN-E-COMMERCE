import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import userRoute from './routes/auth.route.js'
dotenv.config()

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser()) 

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/auth', userRoute)
mongoose.connect(process.env.MONGO_URI).then(()=> {
    console.log("MongoDB connected")
})

app.listen(PORT, (req, res) =>{
    console.log(`Server is running on port ${PORT}`)
}) 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });