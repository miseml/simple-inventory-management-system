import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from "dotenv";
import {connectDB} from "./db/mongoose.js";
import indexRouter from './routes/index.js';

import {ProductModel} from "./models/product.model.js";
import {ProductRepository} from "./repositories/product.repository.js";
import {ProductController} from "./controllers/product.controller.js";
import {createProductRoutes} from "./routes/products.js";

import { OrderModel } from "./models/order.model.js";
import { OrderRepository } from "./repositories/order.repository.js";
import { OrderController } from "./controllers/order.controller.js";
import { createOrderRoutes } from "./routes/orders.js";

dotenv.config();
const __dirname = path.resolve();

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

await connectDB();

app.use('/', indexRouter);

const productRepository = new ProductRepository(ProductModel);
const productController = new ProductController(productRepository);

app.use(
    "/products",
    createProductRoutes(productController)
);

const orderRepository = new OrderRepository(OrderModel);
const orderController = new OrderController(
    orderRepository,
    productRepository
);

app.use("/orders", createOrderRoutes(orderController));

export default app;
