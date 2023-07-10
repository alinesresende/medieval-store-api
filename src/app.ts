import express from 'express';
import loginRouter from './router/login.router';
import ordersRouter from './router/orders.router';
import productRouter from './router/products.router';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(ordersRouter);
app.use(loginRouter);

export default app;
