import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './route/route.js';
import cors  from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_URL, // Frontend URL
    credentials: true
  }));

app.use(express.json());

const Port = 4000;

app.use('/',router)

app.listen(Port,()=>{
    console.log(`Server is running on Post ${Port}`)
})

const MongoDB_URL = process.env.MongoDB_URL;
Connection(MongoDB_URL)

