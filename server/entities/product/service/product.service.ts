import { Product } from '../model/Product';
import { ProductCreationAttributes } from '../model/Product';

export const productService = {
  async createProduct(data: ProductCreationAttributes) {
    const newProduct = await Product.create(data);

    return newProduct.toJSON();
  }
};
