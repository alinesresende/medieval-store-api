import { Router } from 'express';
import ordersController from '../controller/orders.controller';

const ordersRouter = Router();

ordersRouter.get('/orders', ordersController.getAllOrders);

export default ordersRouter;