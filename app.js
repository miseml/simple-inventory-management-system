import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from "dotenv";
import { connectDB } from "./db/mongoose.js";
import indexRouter from './routes/index.js';

dotenv.config();
const __dirname = path.resolve();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

await connectDB();

app.use('/', indexRouter);

export default app;
