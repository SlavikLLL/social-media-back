import express from 'express';
import UserRoute from './Routes/UserRoute.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import connectDB from './config/connDB.js';
import PostRoute from './Routes/PostRoute.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import UploadRoute from './Routes/UploadRoute.js'
dotenv.config()
const PORT = 3500 ;
const app  = express();

connectDB()
app.use(cors(corsOptions))


app.use(express.json())



app.use(express.urlencoded({extended:false}))
app.use('/auth',AuthRoute);
app.use('/user',UserRoute);
app.use('/posts',PostRoute);
app.use('/upload',UploadRoute)
mongoose.connection.once('open',()=>{
    console.log('db connectd');
    app.listen(PORT,()=>console.log(`server running on ${PORT}`));
})