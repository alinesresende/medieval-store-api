import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrdersReturn } from '../types/Order';

async function getAllOrders(): Promise<OrdersReturn[]> {
  const getOrders = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });

  const listOrders = getOrders.map(({ dataValues: order }) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds?.map((product) => product.id) || [],
  }));

  return listOrders;
}

export default {
  getAllOrders,
};