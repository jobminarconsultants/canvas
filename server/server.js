import express from  'express';
import dotenv from 'dotenv'
import DataBaseConnection from './database/conn.js';
import AuthRouter from './routes/AuthRoutes.js';
const app =express()
const PORT=1010
dotenv.config()
DataBaseConnection()
app.use(express.json())
app.use('/main',AuthRouter)
app.listen(PORT,()=>console.log(`server is running on the port number ${PORT}`))
