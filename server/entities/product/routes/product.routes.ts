import { Router } from 'express';
import { asyncHandler } from '../../../shared/lib/asyncHandler';
import { productController } from '../controller/product.controller';
import { upload } from '../../../shared/middleware/upload.middleware';

const productRouter = Router();
productRouter.post(
  '/',
  upload.single('image'),  // обрабатываем поле 'image'
  productController.createProduct
);
productRouter.get('/', asyncHandler(productController.getAll));
productRouter.get('/:id', asyncHandler(productController.getProductById));


productRouter.get('/', (req, res) => {
  res.status(405).json({ message: 'Use POST method to create product' });
});

export default productRouter;
