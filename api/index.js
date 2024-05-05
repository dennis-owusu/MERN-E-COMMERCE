import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, (req, res) =>{
    console.log(`Server is running on port ${PORT}`)
})