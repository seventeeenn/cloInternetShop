import { Product, ProductCreationAttributes } from "../model/Product";

export const productService = {
  async createProduct(data: ProductCreationAttributes) {
    const newProduct = await Product.create(data);

    return newProduct.toJSON();
  },

  async getAllProducts() {
    const products = await Product.findAll();
    return products.map(p => p.toJSON());
  },
};
