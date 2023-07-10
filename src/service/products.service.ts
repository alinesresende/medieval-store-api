import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

async function newProduct(product: Product): Promise<Model<Product, ProductInputtableTypes>> {
  const newItem = await ProductModel.create(product);
  return newItem;
}

async function getAllProducts(): Promise<Model<Product, ProductInputtableTypes>[]> {
  const getProducts = await ProductModel.findAll();
  return getProducts;
}

export default {
  newProduct,
  getAllProducts,
};