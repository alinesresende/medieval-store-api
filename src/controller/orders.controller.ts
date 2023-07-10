import { Request, Response } from 'express';
import ordersService from '../service/orders.service';

async function getAllOrders(req: Request, res: Response): Promise<void> {
  const getOrders = await ordersService.getAllOrders();
  res.status(200).json(getOrders);
}

export default {
  getAllOrders,
};