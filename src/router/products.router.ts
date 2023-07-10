import { Router } from 'express';
import productsController from '../controller/products.controller';
import { checkName, checkPrice } from '../middleware/product.validate';

const productRouter = Router();

productRouter.post('/products', checkName, checkPrice, productsController.newProduct);
productRouter.get('/products', productsController.getAllProducts);

export default productRouter;
