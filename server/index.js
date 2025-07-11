import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from "./database/db.js";
import Router from './routes/route.js';

dotenv.config();
const app=express();
app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));*/
/*app.options('*', cors({
    origin: 'http://localhost:3000',
    credentials: true
}));*/

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/uploads', express.static('uploads')); 
app.use('/',Router);
const PORT=8000;
app.listen(PORT,()=>console.log(`Server is running successfully on port ${PORT}`));
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);