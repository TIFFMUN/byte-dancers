import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(3000, ()=>{
    console.log("Server running on https://localhost:3000")
})

app.use('/', router());