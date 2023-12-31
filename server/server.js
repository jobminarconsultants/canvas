import express from  'express';
import dotenv from 'dotenv'
import cors from 'cors'
import DataBaseConnection from './database/conn.js';
import AuthRouter from './routes/AuthRoutes.js';
const app =express()
const PORT=1010
app.use(express.json())
dotenv.config()
app.use(cors())
DataBaseConnection()

app.use('/main',AuthRouter)
app.listen(PORT,()=>console.log(`server is running on the port number ${PORT}`))
