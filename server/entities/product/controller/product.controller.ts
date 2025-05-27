import { Request, Response } from 'express';
import { productService } from '../service/product.service';
import { Product } from '../model/Product';

export const productController = {
  createProduct: async (req: Request, res: Response) => {
    const { name, description, price, discount_price, quantity } = req.body;

    const imagePath = req.file ? `${req.file.filename}` : '';
    // const image = req.file?.filename || '';

    try {
      const newProduct = await productService.createProduct({
        name,
        description,
        price: Number(price),
        discount_price: Number(discount_price),
        quantity: Number(quantity),
        image: imagePath,
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
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Failed to fetch products' });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      res.json(product.toJSON());
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }  
};
