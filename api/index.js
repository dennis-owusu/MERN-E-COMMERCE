import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv'
import userRoute from './routes/auth.route.js'
import updateRoute from './routes/user.route.js'
import productRoute from './routes/products.route.js'
<<<<<<< HEAD
import path from 'path';
=======
>>>>>>> 3ee5f5806a5db214ce4942ab3829c6aa75a681b8
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
app.use('/api/user', updateRoute)
app.use('/api/user', productRoute)
mongoose.connect(process.env.MONGO_URI).then(()=> {
    console.log("MongoDB connected")
})

<<<<<<< HEAD
const __dirname = path.resolve();  

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
}) 
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
=======
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
}) 
>>>>>>> 3ee5f5806a5db214ce4942ab3829c6aa75a681b8
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });