import { Request, Response } from 'express';
import { Product } from '../model/Product';

export const productController = {
  addProduct: async (req: Request, res: Response) => {
    try {
      const { name, description, price, discountPrice, quantity, image } = req.body;

      const product = await Product.create({
        name,
        description,
        price,
        discount_price: discountPrice || null, // optional field
        quantity,
        image,
      });

      res.status(201).json({
        message: 'Product added successfully',
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to add product',
        error: error.message,
      });
    }
  },
};
