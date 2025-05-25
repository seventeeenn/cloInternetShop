import { Router } from 'express';
import { asyncHandler } from '../../../shared/lib/asyncHandler';
import { productController } from '../controller/product.controller';

const productsRoutes = Router();
productsRoutes.post('/', asyncHandler(productController.createProduct));

productsRoutes.get('/', (req, res) => {
  res.status(405).json({ message: 'Use POST method to create products' });
});

export default productsRoutes;