import { Request, Response } from 'express';
import { productService } from '../service/product.service';

export const productController = {
  createProduct: async (req: Request, res: Response) => {
    const { name, description, price, discount_price, quantity, image } = req.body;

    try {
      const newProduct = await productService.createProduct({
        name,
        description,
        price,
        discount_price,
        quantity,
        image,
      });

      res.status(201).json({
        product: newProduct,
        message: 'Product created successfully!',
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message || 'Product creation failed',
      });
    }
  },
};