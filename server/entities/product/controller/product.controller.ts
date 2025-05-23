import { Request, Response } from 'express';
import { productService } from '../service/product.service';

export const storyController = {
  createStory: async (req: Request, res: Response) => {
    const { id, name, description, price, discount_price, quantity, image } = req.body;

    try {
      const newStory = await productService.createProduct({ id, name, description, price, discount_price, quantity, image });

      res.status(201).json({
        id: newStory.id,
        message: 'Story created successfully!',
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message || 'Story creation failed',
      });
    }
  }
};