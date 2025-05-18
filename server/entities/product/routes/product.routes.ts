import { Router } from 'express';
import { productController } from '../controller/product.controller';
import { asyncHandler } from '../../../shared/lib/asyncHandler';

const productRouter = Router();

productRouter.post('/products', asyncHandler(productController.addProduct));

export default productRouter;