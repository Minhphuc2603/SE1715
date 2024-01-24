// Khai báo module express
import express, { json } from 'express';
import * as dotenv from 'dotenv';
import {productRouter} from './route/index.js';
import connectDB from './database.js';
import cors from "cors"

dotenv.config();
// Định nghĩa 1 webserver
const app = express();
app.use(
    cors({
      origin: process.env.CLIENT,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    })
  );

// Kích hoạt middleware cho phép Express server làm việc với dữ liệu JSON
app.use(json());

app.get('/', (req, res) => {
    res.send("Welcome to Home page!");
});

app.use('/products',productRouter);


const port = process.env.PORT || 8080;

app.listen(port, async () => {
    connectDB();
    console.log(`Web server running on: http://localhost:${port}`);
});