import { Request, Response } from 'express';
import productsService from '../service/products.service';
import { Product } from '../types/Product';

async function newProduct(req: Request, res: Response): Promise<void> {
  const { name, price, orderId } = req.body;
  const newItem = await productsService.newProduct({ name, price, orderId } as Product);
  res.status(201).json(newItem);
}

async function getAllProducts(req: Request, res: Response): Promise<void> {
  const getProducts = await productsService.getAllProducts();
  res.status(200).json(getProducts);
}

export default {
  newProduct,
  getAllProducts,
};